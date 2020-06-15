import needle = require('needle')
import cheerio = require('cheerio')

class WebCrawler{
    private start_url: string
    private currentPage: string
    private visited_urls: string[]
    private unvisited_urls: string[]  

    constructor(start_url: string){
        this.start_url = start_url
        this.currentPage = this.start_url
        this.visited_urls = []
        this.unvisited_urls = []

        this.crawl()
    }

    async crawl():Promise<void>{
        if(this.currentPage !== ""){
            await this.visitPage(this.currentPage)
            this.getNextURL()
            await this.displayLists()
            this.crawl()
            return
        }
        
        console.log('No more URLs')
        return
    }

    getNextURL():void{
        this.visited_urls.push(this.currentPage)
        if(this.unvisited_urls.length == 0){
            this.currentPage = ""
            return
        }
        this.currentPage = this.unvisited_urls.pop()
    }

    visitPage(url: string):Promise<void>{        
        console.log(`Visiting: ${url}`)

        return new Promise<void>((resolve, reject) => {
            needle.get(url, (err, res, body) => {
                if(err){
                    console.log(err)
                    resolve()
                }

                if(res.statusCode !== 200){
                    console.log(`error connecting ${res.statusCode}`)
                    resolve()
                }else{
                    var DOM = cheerio.load(res.body)

                    DOM('a').each((i, link) => {
                        var str_link: string = DOM(link).attr('href')
                        
                        if(str_link !== undefined && str_link[0] === '/'){
                            if(!this.visited_urls.includes(str_link) && !this.unvisited_urls.includes(str_link)){
                                this.addUnvisited(`${this.currentPage}${str_link.slice(1)}`)
                            }
                        }  
                    })

                    console.log('\tsuccessful visit')  
                    resolve()
                }
            })
        })
    }

    addUnvisited(url: string):void{
        this.unvisited_urls.unshift(url)
    }

    displayLists():void{
        console.log(`# Unvisited: ${this.unvisited_urls.length}`);
        this.unvisited_urls.forEach(url => {
            console.log(`\t${url}`)
        })

        console.log(`\n# Visited: ${this.visited_urls.length}`);
        this.visited_urls.forEach(url => {
            console.log(`\t${url}`)
        })
        console.log('\n')
    }
}

var crawler: WebCrawler = new WebCrawler('https://www.4chan.org/')
