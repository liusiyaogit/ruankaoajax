//引入express
const express = require('express')

//创建app实例对象
const app = express();
//暴露静态资源   解决跨域问题  但是这里面必须把html放在src文件夹里面然后用下面命令，此代码和下面的设置所有域都可以访问该域的资源设置允许的自定义请求头相冲
// app.use(express.static(__dirname+''))
//使用中间件来解析urlencoded编码形式的请求体参数，就是解析HTML的xhr.send()里面的
// app.use(express.urlencoded({extended:true}))
app.use(express.json())
//创建路由规则
//request是对请求报文的封装
//response是对响应报文的封装
//响应get请求--可以接收query参数
// app.get('/test',(request,response)=>{
// 	console.log('有人请求test了，有人点击按钮请求啦--携带的query参数是：',request.query);
    //设置响应头名字，设置允许跨域（如果设置了响应头名字那么在network里就能看到了）
    // response.setHeader('Access-Control-Allow-Origin','*')
    // response.send('hello_test')})
//响应GET请求--可以接收params参数    app.all 是响应所有类型的请求getpostoption等等
// app.get('/test2/:name/:age/:aaa',(request,response)=>{
// 	console.log('有人请求test_get2了--携带的params参数是：',request.params);})
    // 设置响应头名字，设置允许跨域（如果设置了响应头名字那么在network里就能看到了）
    app.use('/test3', (req,res,next) => {
    //     // 设置所有域都可以访问该域的资源
        res.setHeader('Access-Control-Allow-Origin','*');
    //     // 设置允许的自定义请求头
        res.setHeader('Access-Control-Allow-Headers', '*');
        next();
    })
app.post('/test3',(request,response)=>{
        console.log('有人请求test3了--携带的请求体body参数是：',request.body);
   
//设置响应体
	// response.send('hello_test')
    //此处的send里面只能写字符串和buffer：buffer缓冲区。专门存储二进制数据的，用法跟数组类似
    //上面send里面能相应的数据类型太局限了，如果要传数据的话一般都是json的,所以在下面设置一个响应数据
    const data = {
        mingzi:'我是后台数据ruankao.js中的哟'
    }
    //然后对上面数据进行字符串转换
    let bb =JSON.stringify(data);
    //然后再设置响应体
    response.send(bb);
    //这时候上面的 mingzi:'wowo'就被传到页面上去了，如果想让别人看到正常的显示的格式而不是数据这种key：value的格式，就需要到html中进行数据转化
})
//监听端口启动服务
app.listen(8080,(err)=>{
	if(!err) {
		console.log('测试ajax请求的服务器开启成功了！');
        //如果使用静态资源暴露解决跨域问题的时候就用下面这地址，如果用设置所有域都可以访问该域的资源这个就直接在HTML用open with live sever就可以了5050也能用
        // console.log('http://127.0.0.1:8080/ruan.html')  
    }
})