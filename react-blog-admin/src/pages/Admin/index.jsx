import { useEffect } from 'react';
import { Select } from 'antd';
import Nav from '../../components/Nav';
import Content from '../../components/Content';
import { connect } from 'react-redux';
import { getClasses } from '../../redux/actions/classes';
import { getTags } from '../../redux/actions/tags';
import { db } from '../../utils/cloudBase';
import './index.css';

const { Option } = Select;

const Admin = props => {
    useEffect(() => {
        // 向数据库获取所有标签
        db.collection('tags')
            .get()
            .then(res => {
                const newTags = res.data.map(item => item.content);
                props.getTags(newTags);
            });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
    useEffect(() => {
        // 向数据库获取所有分类
        db.collection('classes')
            .get()
            .then(res => {
                const newClasses = res.data.map(item => item.content);
                props.getClasses(newClasses);
            });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <div className="AdminBox">
            <div className="navBack"></div>
            <Nav />
            <Content />
        </div>
    );
};

export default connect(
    state => ({
        tags: state.tags,
        classes: state.classes,
    }),
    {
        getClasses,
        getTags,
    }
)(Admin);
