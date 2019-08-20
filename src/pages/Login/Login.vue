<template>
    <section class="loginContainer">
        <div class="loginInner">
            <div class="login_header">
                <h2 class="login_logo">外卖</h2>
                <div class="login_header_title">
                    <a href="javascript:;" :class="{on:!loginWay}" @click="loginWay=false">短信登录</a>
                    <a href="javascript:;" :class="{on:loginWay}" @click="loginWay=true">密码登录</a>
                </div>
            </div>
            <div class="login_content">
				<form @submit.prevent="login">
				  <div :class="{on:!loginWay}">
				    <section class="login_message">
				      <input type="tel" maxlength="11" placeholder="手机号" v-model="phone">
				      	<button :disabled="!right_phone" class="get_verification" :class="{right_phone}" @click.prevent="GetCode">{{time?`已发送${time}s`:"获取验证码"}}</button>
				    </section>
				    <section class="login_verification">
				      <input type="tel" maxlength="8" placeholder="验证码" v-model="code">
				    </section>
				    <section class="login_hint">
				      温馨提示：未注册硅谷外卖帐号的手机号，登录时将自动注册，且代表已同意
				      <a href="javascript:;">《用户服务协议》</a>
				    </section>
				  </div>
				  <div :class="{on:loginWay}">
				    <section>
				      <section class="login_message">
				        <input type="text" maxlength="11" placeholder="手机/邮箱/用户名" v-model="name">
				      </section>
				      <section class="login_verification">
				        <input type="text" maxlength="8" placeholder="密码" v-if="showPwd" v-model="pwd">
				        <input type="password" maxlength="8" placeholder="密码" v-if="!showPwd" v-model="pwd">
				        <div class="switch_button" :class="showPwd?'on':'off'" @click="showPwd=!showPwd">
				          <div class="switch_circle" :class="showPwd?'right':''"></div>
				          <span class="switch_text">...</span>
				        </div>
				      </section>
				      <section class="login_message">
				        <input type="text" maxlength="11" placeholder="验证码" v-model="captcha">
				        <img  ref="captcha" class="get_verification" src="http://localhost:4000/captcha" alt="captcha" @click="changeCaptcha">
				      </section>
				    </section>
				  </div>
				  <button class="login_submit">登录</button>
				</form>
				<a href="javascript:;" class="about_us">关于我们</a>
            </div>
            <a href="javascript:" class="go_back" @click="$router.back()">
				<i class="iconfont icon-jiantou2"></i>
			</a>
        </div>
    </section>
</template>

<script>
import {reqPwdLogin,reqSendCode,reqSmsLogin} from '../../api/index'
    export default{
		data(){
			return{
				loginWay: false,//ture为密码登陆
				showPwd:false,//是否显示密码
				phone:'',//手机号
				time:0,//倒计时
				pwd:'',//密码
				code:'',//手机短信验证码
				name:'',//用户名
				captcha:''//图形验证码
			}
		},
		computed:{
			right_phone(){
				return /^[1][3,4,5,6,7,8,9][0-9]{9}$/.test(this.phone)
			}
		},
		methods:{
			//异步获取短信验证码
			async GetCode(){
				if(this.time===0){
					this.time = 30
					this.Timer = setInterval(() => {
						this.time--
						if(this.time<=0){
							clearInterval(this.Timer)
						}
					}, 1000)

					//发送ajax请求，手机短信
					const result = await reqSendCode(this.phone)
					if(result.code===1){
						this.$messagebox('警告！',result.msg)
						//停止定时器
						if(this.time){
							this.time = 0
							clearInterval(this.Timer)
							this.intervalId = 0
						}
					}
				}
			},
			//异步登陆
			async login(){
				let result = ''
				//前台表单验证
				if(this.loginWay===true){//密码登陆
					const {name,pwd,captcha} = this

					if(!name){
						//用户名必须指定
						this.$messagebox('警告！', '用户名必须指定')
						return
					}else if(!pwd){
						//密码必须指定
						this.$messagebox('警告！', '密码必须指定')
						return
					}else if(!captcha){
						//密码必须指定
						this.$messagebox('警告！', '验证码必须指定')
						return
					}
					//发送ajax请求密码登陆
					result = await reqPwdLogin({name,pwd,captcha})

				}else{
					const {phone,code} = this
					if(!/^[1][3,4,5,6,7,8,9][0-9]{9}$/.test(phone)){
						this.$messagebox('警告！', '手机号码格式不正确')
						return
					}else if(!/^\d{6}$/.test(code)){
						this.$messagebox('警告！', '验证码必须为6位')
						return
					}

					result = await reqSmsLogin(phone,code)
					//发送ajax请求短信登陆
				}
				//停止定时器
				if(this.time){
					this.time = 0
					clearInterval(this.Timer)
					this.intervalId = 0
				}
				//根据结果数据显示
				if(result.code === 0){
						const user = result.data
						//将user保存岛vuex的state
						this.$store.dispatch('recordUser',user)
						//去个人中心界面
						this.$router.replace('/profile')
					}else{
						const msg = result.msg
						this.$messagebox('警告！',msg)
						this.changeCaptcha()
					}
			},
			//跟换验证码
			changeCaptcha(){
				this.$refs.captcha.src="http://localhost:4000/captcha?time="+Date.now()
			}
		}
    }
</script>

<style lang="stylus" rel="stylesheet/stylus">
    @import "../../common/stylus/mixins"
		.loginContainer
			width 100%
			height 100%
			background #fff
			.loginInner
				padding-top 60px
				width 80%
				margin 0 auto
				.login_header
					.login_logo
						font-size 40px
						font-weight bold
						color #02A774
						text-align center
					.login_header_title
						padding-top 40px
						text-align center
						>a
							color #333
							font-size 14px
							padding-bottom 4px
							&:first-child
								margin-right 40px
							&.on
								color #02a774
								font-weight 700
								border-bottom 2px solid #02a774
				.login_content
					>form
						>div
							display none
							&.on
								display block
							input
								width 100%
								height 100%
								padding-left 10px
								box-sizing border-box
								border 1px solid #ddd
								border-radius 4px
								outline 0
								font 400 14px Arial
								&:focus
									border 1px solid #02A774
							.login_message
								position relative
								margin-top 16px
								height 48px
								font-size 14px
								background #fff
								.get_verification
									position absolute
									top 50%
									right 10px
									transform translateY(-50%)
									border 0
									color #ccc
									font-size 14px
									background transparent
									&.right_phone
										color black 
							.login_verification
								position relative
								margin-top 16px
								height 48px
								font-size 14px
								background #fff
								.switch_button
									font-size 12px
									border 1px solid #ddd
									border-radius 8px
									color #fff
									padding 0 6px
									width 30px
									height 16px
									line-height 16px
									position absolute
									top 50%
									right 10px
									transform translateY(-50%)
									transition background-color .3s,border-color .3s
									&.off
										background #FFFFFF
										.switch_text
											float right
											color #ddd
									&.on
										background #02a774
									>.switch_circle
										// transform translateX(27px)
										position absolute
										width 16px
										height 16px
										border 1px solid #ddd
										border-radius 50%
										background #fff
										top -1px
										left -1px
										box-shadow 0 2px 4px 0 rgba(0,0,0,.1)
										transition transform .3s
										&.right
											transform translateX(27px)
							.login_hint
								margin-top 12px
								color #999
								font-size 14px
								line-height 20px
								>a
									color #02A774
						.login_submit
							display block
							width 100%
							height 42px
							margin-top 30px
							border-radius 4px
							background #4cd96f
							color #fff
							text-align center
							font-size 16px
							line-height 42px
							border 0
					.about_us
						display block
						font-size 12px
						margin-top 20px
						text-align center
						color #999
				.go_back
					position absolute
					top 5px
					left 5px
					width 30px
					height 30px
					>.iconfont
						font-size 20px
						color #999
</style>