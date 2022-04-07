import request from '@/utils/request'

// 获取标签
export function getArticleTag() {
  return request('POST', '/article/getInfo')
}

//发表文章
export function postArticle(params){
  return request('POST',"/article/add",params, {showTip: true});
}

//获取文章列表
export function getArticleList(data) {
  return request('POST', '/article/getshow', data)
}
/*删除文章*/
export function deleteArticle(_id) {
  if(!_id){
    return Promise.reject();
  }
  return request('POST',"/article/delete",{_id}, {showTip: true});
}

/*更新文章*/
export function updateArticle(_id,options) {
  return request('POST',"/article/update",{_id,options});
}

//发表作品
export function postWork(params){
  return request('POST',"/work/submit",params);
}

/*请求作品*/
export function getWork() {
  return request('GET',"/work");
}

/*删除作品*/
export function deleteWork(_id) {
  if(!_id){
    return Promise.reject();
  }
  return request('POST',"/work/delete",{_id});
}

/*更新作品*/
export function updateWork(_id,options) {
  return request('POST',"/work/update",{_id,options});
}

/*请求articleInfo*/
export function getArticleInfo(){
  return request({
    method: 'get',
    url: '/article/getInfo'
  })
}


/*请求用户列表*/
export function getUserList(){
  return request('GET',"/user/get");
}

/*请求单个用户数据*/
/*export function getUserInfo(_id){
  return request('GET',"/user/info?_id="+_id);
}*/

/*删除用户*/
export function deleteUser(_id) {
  return request('POST',"/user/delete",{_id});
}

/*更新用户数据*/
export function updateUser(_id,data) {
  return request('POST','/user/update',{_id,data});
}



/*请求留言列表*/
export function getMessageList() {
  return request('GET',"/message/get");
}
/*删除留言*/
export function deleteMessage(_id) {
  return request('POST',"/message/delete",{_id});
}


/*发表日记*/
export function postDiary(txt,img) {
  return request('POST',"/diary/submit",{txt,img});
}
/*请求日记*/
export function getDiary() {
  return request('GET',"/diary");
}
/*删除日记*/
export function deleteDiary(_id) {
  return request('POST',"/diary/delete",{_id});
}



/*发表友链*/
export function postLinks(options) {
  return request('POST',"/links/submit",options);
}
/*请求友链*/
export function getLinks() {
  return request('GET',"/links");
}
/*删除友链*/
export function deleteLinks(_id) {
  return request('POST',"/links/delete",{_id});
}

/*登陆接口*/
export function login(options) {
  return request('POST','/login',options);
}
/*验证登陆*/
export function ifLogin() {
  return request('POST',"/login/ifLogin");
}
