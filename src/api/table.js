import request from '@/utils/request'

//发表文章
export function postArticle({type,title,content,tag,surface}){
  return request.post("/article/add",{type,title,content,tag,surface});
}

/*请求文章*/
export function getArticle(skip=0,limit=5) {
  return request.get("/article/get"+`?skip=${skip}&limit=${limit}`);
}

/*删除文章*/
export function deleteArticle(_id) {
  if(!_id){
    return Promise.reject();
  }
  return request.post("/article/delete",{_id});
}

/*更新文章*/
export function updateArticle(_id,options) {
  return request.post("/article/update",{_id,options});
}

//发表作品
export function postWork(params){
  return request.post("/work/submit",params);
}

/*请求作品*/
export function getWork() {
  return request.get("/work/get");
}

/*删除作品*/
export function deleteWork(_id) {
  if(!_id){
    return Promise.reject();
  }
  return request.post("/work/delete",{_id});
}

/*更新作品*/
export function updateWork(_id,options) {
  return request.post("/work/update",{_id,options});
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
  return request.get("/user/get");
}

/*请求单个用户数据*/
/*export function getUserInfo(_id){
  return request.get("/user/info?_id="+_id);
}*/

/*删除用户*/
export function deleteUser(_id) {
  return request.post("/user/delete",{_id});
}

/*更新用户数据*/
export function updateUser(_id,data) {
  return request.post('/user/update',{_id,data});
}



/*请求留言列表*/
export function getMessageList() {
  return request.get("/message/get");
}
/*删除留言*/
export function deleteMessage(_id) {
  return request.post("/message/delete",{_id});
}


/*发表日记*/
export function postDiary(txt,img) {
  return request.post("/diary/submit",{txt,img});
}
/*请求日记*/
export function getDiary() {
  return request.get("/diary");
}
/*删除日记*/
export function deleteDiary(_id) {
  return request.post("/diary/delete",{_id});
}



/*发表友链*/
export function postLinks(options) {
  return request.post("/links/submit",options);
}
/*请求友链*/
export function getLinks() {
  return request.get("/links");
}
/*删除友链*/
export function deleteLinks(_id) {
  return request.post("/links/delete",{_id});
}

/*登陆接口*/
export function login(options) {
  return request.post('/login',options);
}
/*验证登陆*/
export function ifLogin() {
  return request.post("/login/ifLogin");
}
