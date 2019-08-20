//mock数据接口
import Mock from 'mockjs'
import apiData from './data'

Mock.mock('/info',{code:0,data:apiData.info})
Mock.mock('/goods',{code:0,data:apiData.goods})
Mock.mock('/ratings',{code:0,data:apiData.ratings})

//不需要向外暴露，只需要保存能执行即可