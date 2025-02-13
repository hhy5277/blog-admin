import { useEffect, useState } from 'react';
import Nav from '../../components/Nav';
import Content from '../../components/Content';
import { connect } from 'react-redux';
import {
    getClasses,
    getTags,
    getPoem,
    getArticles,
    getDrafts,
    getGalleries,
    getSays,
    getLinks,
    getShows,
    getAbout,
    getLogs,
    getMsgs,
} from '../../redux/actions';
import { db } from '../../utils/cloudBase';
import moment from 'moment';
import './index.css';

const Admin = props => {
    const [isMounted, setIsMounted] = useState(true);

    // 获得每日诗句信息
    const getDailyPoem = () => {
        require('jinrishici').load(res => {
            const obj = {
                content: res.data.content,
                title: res.data.origin.title,
                ip: res.ipAddress,
                date: moment().format('YYYY-MM-DD'),
            };
            props.getPoem(obj);
        });
    };
    // 向数据库获取各类数据
    const getDataFromDB = dbName => {
        db.collection(dbName)
            .get()
            .then(res => {
                switch (dbName) {
                    case 'articles': {
                        props.getArticles(res.data);
                        break;
                    }
                    case 'drafts': {
                        props.getDrafts(res.data);
                        break;
                    }
                    case 'classes': {
                        props.getClasses(res.data);
                        break;
                    }
                    case 'tags': {
                        props.getTags(res.data);
                        break;
                    }
                    case 'about': {
                        props.getAbout(res.data);
                        break;
                    }
                    case 'galleries': {
                        props.getGalleries(res.data);
                        break;
                    }
                    case 'links': {
                        props.getLinks(res.data);
                        break;
                    }
                    case 'logs': {
                        props.getLogs(res.data);
                        break;
                    }
                    case 'says': {
                        props.getSays(res.data);
                        break;
                    }
                    case 'shows': {
                        props.getShows(res.data);
                        break;
                    }
                    case 'allComments': {
                        props.getMsgs(res.data);
                        break;
                    }
                    default:
                        break;
                }
            });
    };

    // 组件挂载，获取一次所有标签和分类
    useEffect(() => {
        if (isMounted) {
            getDailyPoem();
            getDataFromDB('articles');
            getDataFromDB('drafts');
            getDataFromDB('classes');
            getDataFromDB('tags');
            getDataFromDB('about');
            getDataFromDB('galleries');
            getDataFromDB('links');
            getDataFromDB('logs');
            getDataFromDB('says');
            getDataFromDB('shows');
            getDataFromDB('allComments');
        }
        return () => {
            setIsMounted(false);
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isMounted]);

    return (
        <div className="AdminBox">
            <div className="navBack"></div>
            <Nav />
            <Content />
        </div>
    );
};

export default connect(() => ({}), {
    getClasses,
    getTags,
    getArticles,
    getDrafts,
    getPoem,
    getGalleries,
    getSays,
    getLinks,
    getShows,
    getAbout,
    getLogs,
    getMsgs,
})(Admin);
