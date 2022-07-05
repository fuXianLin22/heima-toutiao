import request from '@/utils/request'
export const requestLogin = (data) => {
  return request({
    method: 'POST',
    url: '/v1_0/authorizations',
    data
  })
}
export const getSmsCode = (mobile) =>
  request({
    method: 'GET',
    url: `/v1_0/sms/codes/${mobile}`
  })
