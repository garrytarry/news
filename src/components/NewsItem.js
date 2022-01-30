import React from 'react'

function NewsItem(props) {
    let { title, description, urlImg, newsUrl, author, date, source } = props;
    return (
        <>
            <div className="card my-4">
                <img src={urlImg} className="card-img-top" alt="..." />
                <span style={{ zIndex: 10, left: "90%" }} className="position-absolute top-0 translate-middle badge rounded-pill bg-danger">{source}
                </span>
                <div className="card-body">
                    <h5 className="card-title">{title}...</h5>
                    <p className="card-text">{description}...</p>
                    <p style={{ color: 'crimson' }} className="text-muted">By {author} on {new Date(date).toGMTString()}</p>
                    <a rel="noreferrer" target="_blank" href={newsUrl} className="btn btn-info">Read More</a>
                </div>
            </div>
        </>
    )
}

export default NewsItem
