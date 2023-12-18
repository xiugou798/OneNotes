import React from "react";

const Author = () => {
    return (
        <div className="container dark">
            <div className="app">
                <div className="author-cards">
                    <div className="author-card">
                        <div className="author-title">
                            王钞
                        </div>
                        <div className="author-info">
                            学号：2021402030112
                            <br/>
                            简介：一位励志成为软硬件全栈开发的开发者
                            <br/>
                        </div>
                    </div>

                    <div className="author-card">
                        <div className="author-title">
                            唐伟智
                        </div>
                        <div className="author-info">
                            学号：2021402020208
                            <br/>
                            简介：我是一只小码虫
                            <br/>
                        </div>
                    </div>

                    <div className="author-card">
                        <div className="author-title">
                            扶庆明
                        </div>
                        <div className="author-info">
                            学号：2021402050418
                            <br/>
                            简介：励志成为前端开发工程师
                            <br/>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Author;