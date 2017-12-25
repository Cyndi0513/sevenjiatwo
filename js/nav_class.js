
// ========================== 全部商品分类 ========================

var navLis = document.querySelectorAll(".all_class li>a");
var navLisImgs = ["nav_class00","nav_class01","nav_class02","nav_class03","nav_class04","nav_class05","nav_class06","nav_class07","nav_class08","nav_class09","brand","safe"];
for(var i=0;i<navLis.length;i++){
	navLis[i].style.background = "url('../img/"+navLisImgs[i]+".png') no-repeat";
}

// 请求一级目录
// ==============================================================================
// ==============================================================================
$.ajax({
	type: "post",
	url: "http://139.199.11.183:8080/Seven_Two/index/showIndex.do",
	async: true,
	dataType: "json",
	success:function(data){
		console.log(data);
		for(var i=0;i<data.categories.length;i++){
			navLis[i].innerHTML = data.categories[i].cName;
			navLis[i].parentNode.dataset.cId = data.categories[i].cId;
			navLis[i].href = "http://139.199.11.183:8080/Seven_Two/resource/views/sevenAddtwo/html/goodlist.html?cId="+data.categories[i].cId;
		}
		navLis[navLis.length-1].href="http://cps.hzins.com/7jia2";
	}
});
// 移入一级目录触发请求，请求二级目录和三级目录
$(".all_class .all_class_goods").each(function(index){
	$(this).find("ol dl dd").on("load",function(){
		$(this).parents("ol").find("img").remove();
	})
	$(this).one("mouseover",function(){
		// ==============================================================================
		$.ajax({
			type: "post",
			url: "http://139.199.11.183:8080/Seven_Two/category/findChildCategory.do",
			async: true,
			data: {cId:$(".all_class li")[index].dataset.cId},
			dataType: "json",
			success: function(data){
				// console.log(data);
				classRange(data,index,$(".all_class .all_class_goods:nth-of-type("+(index+1)+")"));
			}
		})
	})
	$(this).mouseover(function(){
		$(this).find("ol").css({"display":"block","top":-37*index+"px"});
	})
	$(this).mouseout(function(){
		$(this).find("ol").css("display","none");
	})
	$(".all_class li:nth-last-of-type(1)").find("ol").css("display","none");
});
$(".all_class_brand").find("ol dl dd").on("load",function(){
	$(this).parents("ol").find("img").remove();
})
// 品牌分类
$(".all_class_brand").one("mouseover",function(){
	
	$.ajax({
		type:"post",
		url: "http://139.199.11.183:8080/Seven_Two/brand/findAll.do",
		async: true,
		dataType:"json",
		success:function(data){
			console.log(data);
			$(".all_class_brand").find("ol").html("<dl class='all_class_pinpai'><dt>品牌</dt><dd></dd></dl>");
			for(var i=0;i<data.length;i++){
				$(".all_class_brand").find("ol .all_class_pinpai dd").html($(".all_class_brand").find("ol .all_class_pinpai dd").html()+"<a href='###'>"+data[i].bName+"</a><span>|</span>");
			}
			$(".all_class_brand").find("ol .all_class_pinpai dd").html($(".all_class_brand").find("ol .all_class_pinpai dd").html()+"<a href='http://www.7jia2.com/brand' class='all_pinpai' target='_blank'>全部品牌</a>");
		}
	})
})
$(".all_class_brand").mouseover(function(){
	$(this).find("ol").css({"display":"block","top":"-370px"});
})
$(".all_class_brand").mouseout(function(){
	$(this).find("ol").css("display","none");
})

function classRange(data,index,ele){
	// 商品类
	$(ele).find("ol").html("");
	for(var i=0;i<data.categories.length;i++){
		$(ele).find("ol").html($(ele).find("ol").html()+"<dl class='all_class_range'><dt>"+data.categories[i].cName+"</dt><dd></dd></dl>");
		for(var j=0;j<data.categories[i].childs.length;j++){
			$(ele).find("ol .all_class_range:nth-of-type("+(i+1)+") dd").html($(ele).find("ol .all_class_range:nth-of-type("+(i+1)+") dd").html()+"<a href='http://139.199.11.183:8080/Seven_Two/resource/views/sevenAddtwo/html/goodlist.html?cId="+data.categories[i].childs[j].cId+"' target='_blank'>"+data.categories[i].childs[j].cName+"</a><span>|</span>");
		}
	}
	// 品牌类
	$(ele).find("ol").html($(ele).find("ol").html()+"<dl class='all_class_pinpai'><dt>品牌</dt><dd></dd></dl>");
	for(var i=0;i<data.brands.length;i++){
		$(ele).find("ol .all_class_pinpai dd").html($(ele).find("ol .all_class_pinpai dd").html()+"<a href='http://139.199.11.183:8080/Seven_Two/resource/views/sevenAddtwo/html/goodlist.html?cId="+data.brands[i].bId+"' target='_blank'>"+data.brands[i].bName+"</a><span>|</span>");	
	}
}


// ---------------- 登录请求函数 ----------------
postLogin();
// 获取session
function postLogin(){
	$.ajax({
		type:"get",
		url:"http://139.199.11.183:8080/Seven_Two/user/getSession.do",
		async:true,
		success:function(data){
			console.log(typeof data);
			isLogin(data);
			if($(".right_aside").html()!=""){
				asideLogin(data);
			}
		}
	});
}
// 判断是否登录
function isLogin(data){
	if(data=="null"){
		console.log("1233333");
		var indexNologin = `<ul class="index_header_top_left header_top_left_unlogin">
								<li class="login">
									<a href="http://139.199.11.183:8080/Seven_Two/resource/views/sevenAddtwo/html/login.html?act=login">登录</a>
								</li>
								<li class="register">
									<a href="http://139.199.11.183:8080/Seven_Two/resource/views/sevenAddtwo/html/login.html?act=register">注册</a>
								</li>
							</ul>`;
		$(".index_header_top_leftBox").html(indexNologin);
		var index_header_actImg=`<a href="http://139.199.11.183:8080/Seven_Two/resource/views/sevenAddtwo/html/login.html?act=login" target="_blank">
									<div class="index_actImg_1">500</div>
									<div class="index_actImg_2">
										折合人民币<span>5</span>元
									</div>
								</a>`;
		$(".index_header_actImg").html(index_header_actImg);
		$(".index_header_top_right .index_header_my7jia2 a").attr("href","http://139.199.11.183:8080/Seven_Two/resource/views/sevenAddtwo/html/login.html?act=login");
		$(".index_header_like a").attr("href","http://139.199.11.183:8080/Seven_Two/resource/views/sevenAddtwo/html/login.html?act=login");
		$(".index_header_kefu a").attr("href","http://139.199.11.183:8080/Seven_Two/resource/views/sevenAddtwo/html/login.html?act=login");

	}else{
		var dataLogin = JSON.parse(data);
		// 登录状态下的首页 
		var indexLogined = `<ul class="index_header_top_left header_top_left_logined">
								<li>
									<a href="###" style="padding-right:20px;margin-right:10px;background:url('../img/down-arrow.png') no-repeat right center;">${dataLogin.username}</a>
									<div class="ra_login_after header_ra_login">
										<div class="ra_login_afterTop">
											<div class="afterTop_img">
												<img src="../img/noavatar_middle.gif">
											</div>
											<div class="afterTop_word">
												<p>
													<a href="">可享<span>0</span>个尊驴团队</a>
													<span> > </span>
												</p>
												<p>
													<a href="">我的积分<span>0</span></a>
												</p>
												<p>
													<a href="">我的经验值<span>0</span></a>
												</p>
											</div>
										</div>
										<div class="ra_login_afterBtn">
											<a href="http://www.7jia2.com/credits/" target="_blank">领取今日积分</a>
										</div>
									</div>
								</li>
								<li><a href="http://139.199.11.183:8080/Seven_Two/resource/views/sevenAddtwo/html/user.html?act=user_profile" target="_blank">账号管理</a></li>
								<li><a href="">退出</a></li>
								<li><a href="http://139.199.11.183:8080/Seven_Two/resource/views/sevenAddtwo/html/user.html?act=infor" target="_blank" style="padding-left:30px;background:url(../img/mail-icon.png) 10px center no-repeat;">消息 <span>0</span></a></li>
							</ul>`;
		$(".index_header_top_leftBox").html(indexLogined);
		var index_header_actImg=`<a href="http://www.7jia2.com/credits" target="_blank">
									<div class="index_actImg_1" style="margin:15px 36px 0 0;color:#ff6800;width:72px;">0</div>
									<div class="index_actImg_2" style="width:100px;margin:4px 20px 0 0;color:#333;">
										可抵 <span style="color:#ff6800;font-size:14px;">0</span> 元
									</div>
								</a>`;
		$(".index_header_actImg").html(index_header_actImg);
		$(".index_header_actImg").css({"width":"143px","background":"url('../img/jf_bg2.png') no-repeat"});
		$(".header_top_left_logined li:nth-of-type(1)").on("mouseover",function(){
			$(".header_ra_login").css("display","block");
		});
		$(".header_top_left_logined li:nth-of-type(1)").on("mouseleave",function(){
			$(".header_ra_login").css("display","none");
		});
		$(".header_top_left_logined>li:nth-of-type(3)").on("click",function(){
			$.ajax({
				type:"get",
				url:"http://139.199.11.183:8080/Seven_Two/user/exit.do",
				async: true,
				success:function(data){
					postLogin();
				}
			})
		})
		$(".index_header_my7jia2>a").attr("href","http://139.199.11.183:8080/Seven_Two/resource/views/sevenAddtwo/html/user.html");
		$(".index_header_like>a").attr("href","http://139.199.11.183:8080/Seven_Two/resource/views/sevenAddtwo/html/user.html?act=mycollect");
		var my7jia2Arr = ["user.html?act=myorder","user.html?act=myrefer","user.html?act=mydiscount","ecshop.html"];
		var likeArr = ["user.html?act=mycollect","user.html?act=mycollect&type=store"];
		userLogin(".index_my7jia2_nav li",my7jia2Arr);
		$(".index_my7jia2_nav li:nth-last-of-type(1) a").attr("href","http://139.199.11.183:8080/Seven_Two/resource/views/sevenAddtwo/html/ecshop_login.html")
		userLogin(".index_header_like li",likeArr);
		function userLogin(ele,arr){
			for(var i=0;i<arr.length;i++){
				$(ele+":nth-of-type("+(i+1)+") a").attr("href","http://139.199.11.183:8080/Seven_Two/resource/views/sevenAddtwo/html/"+arr[i]);
			}
		}
	}
}

// ================= 头部下拉框显示/隐藏
function index_OverOut(ele1,ele2){
	$(ele1).on("mouseover",function(){
		$(ele2).css({"display":"block","width":$(this).width()+"px"});
	})
	$(ele1).on("mouseleave",function(){
		$(ele2).css("display","none");
	})
}
index_OverOut(".index_header_my7jia2",".index_my7jia2_nav");
index_OverOut(".index_header_like",".index_like_nav");
index_OverOut(".index_header_kefu",".index_kefu_nav");



// ====================================== 侧边栏 ===================================
function asideLogin(data){
	if(data=="null"){
		$(".right_aside_like a").attr("href","http://139.199.11.183:8080/Seven_Two/resource/views/sevenAddtwo/html/login.html?act=login");
		$(".ra_kefu_before ul li a").attr({"href":"http://139.199.11.183:8080/Seven_Two/resource/views/sevenAddtwo/html/login.html?act=login"});
	}else{
		$(".right_asideTop a").css("background","url('../img/right-ad-zbk.gif') no-repeat -118px 0")
		$(".right_aside_like a").attr("href","http://139.199.11.183:8080/Seven_Two/resource/views/sevenAddtwo/html/user.html?act=mycollect");
	}
	$(".right_asideMid .right_aside_login").on("mouseover",function(){
		$(this).css({"background":" url('../img/arrow-right-icon.png') 0 center no-repeat rgb(0,0,0)"});
		$(this).find(".ra_login_before").css("display","block");
		if(data == "null"){
			//未登录
			$(this).find(".ra_login_before").find("form").css("display","block");
			$(this).find(".ra_login_after").css("display","none");
		}else{
			// 已登录
			$(this).find(".ra_login_after").css("display","block");
			$(this).find(".ra_login_before").find("form").css("display","none");
		}
	});
	$(".right_asideMid .right_aside_login").on("mouseout",function(){
		$(this).css({"background":" url('') 0 center no-repeat transparent"});
		$(this).find(".ra_login_before").css("display","none");
		$(this).find(".ra_login_after").css("display","none");
	});
}
var asideNavs = $(".right_aside .asideNavs");
for(var i=1;i<asideNavs.length-1;i++){
	asideNavs[i].onmouseover = function(){
		this.style.background='url("../img/right-icon-green.png") 0 center no-repeat rgb(0,0,0)';
	}
	asideNavs[i].onmouseout = function(){
		this.style.background='url("") 0 center no-repeat transparent';
	}
}
// 侧边栏移入移出事件
function asideMove(ele1,ele2){
	$(ele1).mouseover(function(){
		$(ele2).css({"left":"-123px","transition":"0.2s"});
	})
	$(ele1).mouseout(function(){
		$(ele2).css({"left":"40px","transition":"0.2s"});
	})
}
asideMove(".right_aside_shopcart",".ra_shopcart_before");
asideMove(".right_aside_like",".ra_like_before");
function asideOver_out(ele1,ele2){
	$(ele1).mouseover(function(){
		$(ele2).css({"display":"block"});
	})
	$(ele1).mouseout(function(){
		$(ele2).css({"display":"none"});
	})
}
asideOver_out(".right_aside_kefu",".ra_kefu_before");
asideOver_out(".asideBot_wechat",".ra_wechat_before");

$(".asideBot_backTop").click(function(){
	$(window).scrollTop(0);
})

// ------------ 首页购物车同步 
$.ajax({
	type:"get",
	url: "http://139.199.11.183:8080/Seven_Two/shoppingCar/findShoppingCar.do",
	async:true,
	success:function(data){
		var dataCart = JSON.parse(data);
		if(data == "null"||dataCart.kinds == 0){
			$(".index_header_cart a span").html("0");
		}else{
			$(".index_header_cart a span").html(dataCart.kinds);
		}
	}
})
// --------------------------------------- 模糊查询 --------------------------------
var likeName = "";
$.ajax({
	type:"get",
	url:"http://139.199.11.183:8080/Seven_Two/index/findByLikeName.do?likeName=冲锋",
	async: true,
	// data:{likeName:likeName},
	dataType:"json",
	success:function(data){
		console.log(data);
	}
})
// $(".index_search_box .index_search_text").keyup(function(){
// 	likeName = $(".index_search_box .index_search_text").val();
// })


