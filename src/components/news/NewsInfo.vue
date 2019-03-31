<template>
    <div class="newsinfo-container">
        <h3 class="title">{{ this.newsInfo.title }}</h3>
        <p class="subtitle">
            <span>发表时间：{{ this.newsInfo.add_time | dateFormat }}</span>
            <span>点击：{{ this.newsInfo.click }}</span>
        </p>
        <hr>
        <div class="content" v-html="newsInfo.content"></div>
        <comment-box :id="this.id"></comment-box>
    </div>
</template>
<script>
import { Toast } from 'mint-ui'

//1. 导入 评论子组件
import comment from '../subcomponents/comment'
export default {
    data(){
        return {
            id:this.$route.params.id,  //将在路由中获取到的id挂载到 id 上方便以后调用
            newsInfo:{} //新闻对象
        }
    },
    created(){
       this.getNewsINfo();
    },
    methods:{
        getNewsINfo(){
            this.$http.get('api/getnew/'+this.id).then((result)=>{
               if(result.body.status===0){
                   this.newsInfo=result.body.message[0];
               }else{
                    Toast('获取详细新闻失败')
               }
            })
        }
    },
    components:{ //用来注册子组件的节点
      "comment-box":comment
    }
}
</script>
<style lang="scss">
.newsinfo-container{
    padding:0 4px;
    .title{
        font-size: 16px;
        text-align: center;
        margin:15px 0;
        color:red;
    }
    .subtitle{
        font-size: 13px;
        color:#226aff;
        display: flex;
        justify-content: space-between;
    }
    .content{
        img{
            width:100%;
        }
    }
}
</style>
