import React, { useState, useEffect } from 'react'
import NewsItem from './NewsItem'
import Spinner from './Spinner';
import PropTypes from 'prop-types'
import InfiniteScroll from 'react-infinite-scroll-component';

function News(props) {
    const [articles, setArticles] = useState([])
    const [loading, setLoading] = useState(true)
    const [totalResults, setTotalResults] = useState(0)
    const [page, setPage] = useState(1)
    const capatalize = (str) => str.charAt(0).toUpperCase() + str.slice(1);

    const updateNews = async () => {
        props.setProgress(0)
        let url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.apiKey}&page=${page}&pageSize=${props.pagesize}`
        setLoading(true)
        props.setProgress(50)
        let data = await fetch(url)
        props.setProgress(75)
        let parsedData = await data.json()
        props.setProgress(100)
        setLoading(false)
        setTotalResults(parsedData.totalResults)
        setArticles(parsedData.articles)
    }

    useEffect(() => {
        document.title = `${capatalize(props.category)} - NewsMonkey`;
        updateNews();//eslint-disable-next-line
    }, [])


    const fetchMoreData = async () => {
        setPage(page + 1);
        let url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.apiKey}&page=${page + 1}&pageSize=${props.pagesize}`;
        let data = await fetch(url)
        let parsedData = await data.json()
        setArticles(articles.concat(parsedData.articles))
        setTotalResults(parsedData.totalResults)
    };
    return (
        <>
            <h1 className="text-center my-5">
                NewsMonkey - Top {capatalize(props.category)} Headline
            </h1>
            {loading && <Spinner />}
            <InfiniteScroll
                dataLength={articles.length}
                next={fetchMoreData}
                hasMore={articles.length !== totalResults}
                loader={<Spinner />}
            >
                <div className="container">
                    <div className="row">
                        {!loading && articles.map((elem, i) => {
                            return <div key={i} className="col-md-4">
                                <NewsItem newsUrl={elem.url} title={elem.title ? elem.title.slice(0, 45) : ""}
                                    author={elem.author ? elem.author : "author"} source={elem.source.name}
                                    date={elem.publishedAt}
                                    description={elem.description ? elem.description.slice(0, 80) : ""}
                                    urlImg={elem.urlToImage ? elem.urlToImage : "https://upload.wikimedia.org/wikipedia/commons/thumb/6/6c/No_image_3x4.svg/1280px-No_image_3x4.svg.png"}
                                />
                            </div>
                        })}
                    </div>
                </div>
            </InfiniteScroll>
        </>
    )
}

export default News

News.defaultProps = {
    country: "in",
    category: "general"
}
News.propTypes = {
    country: PropTypes.string,
    pagesize: PropTypes.number,
    category: PropTypes.string,
    apiKey: PropTypes.string
}

