<template>
  <div class="login-container">
    <!-- 登录头部 -->
    <van-nav-bar title="登录" />
    <!-- 登录主体-表单 -->
    <van-form @submit="onSubmit" ref="form">
      <van-field
        v-model="username"
        name="mobile"
        placeholder="13911111112"
        :rules="rules.mobile"
        required
      >
        <template #left-icon>
          <i class="toutiao toutiao-shouji1"></i>
        </template>
      </van-field>
      <van-field
        v-model="password"
        name="code"
        placeholder="246810"
        :rules="rules.code"
        required
        type="number"
        maxlength="6"
      >
        <template #left-icon>
          <i class="toutiao toutiao-yanzhengma"></i>
        </template>
        <template #button>
          <van-count-down
            :time="60000"
            format="ss s"
            v-if="isShowCountDown"
            @finish="isShowCountDown = false"
          />
          <van-button
            v-else
            class="send-sms-btn"
            size="small"
            native-type="button"
            type="primary"
            @click="sendSmsCode"
            :disabled="isDisAbled"
          >
            发送验证码
          </van-button>
        </template>
      </van-field>
      <div style="margin: 16px">
        <van-button block type="info" native-type="submit">提交</van-button>
      </div>
    </van-form>
  </div>
</template>

<script>
import { requestLogin, getSmsCode } from '@/api'
import { Toast } from 'vant'
export default {
  name: 'LoginPage',
  data() {
    return {
      username: '',
      password: '',
      isDisAbled: false,
      rules: {
        mobile: [
          {
            required: true,
            message: '手机号不能为空'
          },
          {
            pattern: /^1[3456789]\d{9}$/,
            message: '手机号错误'
          }
        ],
        code: [
          {
            required: true,
            message: '验证码不能为空'
          },
          {
            pattern: /^\d{6}$/,
            message: '验证码错误'
          }
        ]
      },
      isShowCountDown: false
    }
  },
  methods: {
    async onSubmit(values) {
      try {
        const res = await requestLogin(values)
        console.log(res)
        Toast.success('成功文案')
      } catch (e) {
        // console.log(e?.response?.data?.message)
        Toast.fail(e?.response?.data?.message || '服务器错误')
      }
    },
    async sendSmsCode() {
      try {
        // 分别捕获错误，对不同的错误按照不同的逻辑做处理
        await this.$refs.form.validate('mobile')
      } catch (e) {
        console.log(e)
        return
      }
      try {
        // 发送验证码请求
        this.isDisAbled = true
        await getSmsCode(this.username)
        // 展示倒计时组件
        this.isShowCountDown = true
        this.$toast.success('发送验证码成功')
        // console.log('发送验证码...')
      } catch (e) {
        //  获取失败的提示
        this.$toast.fail(e?.response?.data?.message || '出错了')
        this.isShowCountDown = false
      } finally {
        this.isDisAbled = false
      }
    }
  }
}
</script>
<style scoped lang="less">
.login-container {
  .toutiao {
    font-size: 37px;
  }
  .send-sms-btn {
    width: 158px;
    height: 46px;
    line-height: 46px;
    background-color: #ededed;
    font-size: 22px;
    color: #666;
  }
}
</style>
