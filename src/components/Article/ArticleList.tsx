import * as React from 'react'

const ArticleList: React.FC = () => {
  return (
    <React.Fragment>
      <div className="article-preview">
        <div className="article-meta">
          <a href="/profile.html">
            <img src="http://i.imgur.com/Qr71crq.jpg" alt="placeholder" />
          </a>
          <div className="info">
            <a href="/" className="author">
              Eric Simons
            </a>
            <span className="date">January 20th</span>
          </div>
          <button className="btn btn-outline-primary btn-sm pull-xs-right">
            <i className="ion-heart"></i> 29
          </button>
        </div>
        <a href="/" className="preview-link">
          <h1>How to build webapps that scale</h1>
          <p>This is the description for the post.</p>
          <span>Read more...</span>
        </a>
      </div>

      <div className="article-preview">
        <div className="article-meta">
          <a href="/profile.html">
            <img src="http://i.imgur.com/N4VcUeJ.jpg" alt="placeholder" />
          </a>
          <div className="info">
            <a href="/" className="author">
              Albert Pai
            </a>
            <span className="date">January 20th</span>
          </div>
          <button className="btn btn-outline-primary btn-sm pull-xs-right">
            <i className="ion-heart"></i> 32
          </button>
        </div>
        <a href="/" className="preview-link">
          <h1>
            The song you won't ever stop singing. No matter how hard you try.
          </h1>
          <p>This is the description for the post.</p>
          <span>Read more...</span>
        </a>
      </div>
    </React.Fragment>
  )
}

export default ArticleList
