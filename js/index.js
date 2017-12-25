 // ================ 头部显示/隐藏
$(".index_header_line").on("mouseover",function(){
	$(".index_header").css("display","none");
	$(".index_header_mask").css("display","block");
});
$(".index_header_mask").on("mouseleave",function(){
	$(".index_header").css("display","block");
	$(this).css("display","none");
})

// =============== 首页大轮播图 ==================
var swiperImgs = [];
$(".index_swiper_points:nth-of-type(1)").on("load",function(){
	$(".index_swiiper_load").remove();

})
$.ajax({
	type: "post",
	url: "http://139.199.11.183:8080/Seven_Two/index/showIndex.do",
	async: true,
	dataType: "json",
	success:function(data){ 
		console.log(data);
		main_right_notice(data);
		index_advert_list(data);
		for(var i=0;i<data.carousels.length;i++){
			swiperImgs[i] = data.carousels[i].cName;
		}   
		indexSwiper(swiperImgs);                                                                                                                                                                                                                         
	}
});

function main_right_notice(data){
	for(var i=0;i<data.notices.length;i++){
		var notice_html = `<li>
				<a href="${data.notices[i].noticeUrl}" target="_blank" title="${data.notices[i].noticeName}">${data.notices[i].noticeName}</a>
			</li>`
		$(".main_right_notice ul").html($(".main_right_notice ul").html()+notice_html);
	}
}

var swiperLen = 0;
function indexSwiper(swiperImgs){
	$(".index_swiper_btns .swiper_btnsBox").html("");
	for(var i=0;i<swiperImgs.length;i++){
		$(".index_swiper_btns .swiper_btnsBox").html($(".index_swiper_btns .swiper_btnsBox").html()+"<span></span>");
	}
	swiperLen = $(".index_swiper_btns .swiper_btnsBox>span")[0].offsetWidth + 8;
	$(".index_swiper_points").css("backgroundImage","url("+swiperImgs[0]+")");
	swiperFun(".index_swiper_points",".index_swiper_btns .swiper_btnsBox>span",swiperImgs,"linear-gradient(to bottom,#ed852b,#f92a2d)","onclick",swiperLen);
}

// ============ 商城公告部分 ===============
// ---- main_right_wechat ----
$(".main_right_wechat ul li").each(function(index){
	$(this).css("backgroundImage","url('../img/shop-ico0"+(index+1)+".png')");
	$(this).mouseover(function(){
		$(this).css("backgroundImage","url('../img/shop-ico0"+(index+1)+"-hover.png')");
		$(this).find("img").css("display","inline");
	});
	$(this).mouseout(function(){
		$(this).css("backgroundImage","url('../img/shop-ico0"+(index+1)+".png')");
		$(this).find("img").css("display","none");
	})
})


// =============== 首页main_new部分 ==========
$(".index_main_new>ul>li").mouseover(function(){
	$(this).css("opacity","0.6");
});
$(".index_main_new>ul>li").mouseout(function(){
	$(this).css("opacity","1");
});

// ================== 热门品牌部分 ===================
// 初始状态
index_main_change(1);
// 请求后台数据
function index_main_change(num){
	$.ajax({
		type:"post",
		url: "http://139.199.11.183:8080/Seven_Two/brand/update.do",
		async: true,
		dataType:"json",
		success: function(data){
			mainChange(data,num);
		}
	})
}
function mainChange(data,num){
	var _html1  = "";
	var length = data.length;
	for(let i = 0;i<length;i++){
			_html1 += `<li>
			<a href="${"http://139.199.11.183:8080/Seven_Two/resource/views/sevenAddtwo/html/brand.html?bId=" + data[i].bId}"><img src="${data[i].url}" alt=""></a></li>`;
	}
	$(".change_switch_"+num).html(_html1);
}

// 点击切换数据
var changedNum = 1;
$(".changes_topRt_1>a:nth-of-type(1)").on("click",changePinpai);
function changePinpai(){
	var changedTimer;
	var changedTop = 0;
	var changedLeft = 0;
	var lef = -4;
	var changedNum2 = changedNum;
	clearInterval(changedTimer);
	changedTimer = setInterval(function(){
		changedTop += 4;
		changedLeft += lef;
		if(changedLeft <=-8){
			lef = 4;
		}
		if(changedLeft >= 0){
			changedLeft = 0;
		}
		if(changedTop <= 152){
			$(".changes_topRt_1>a:nth-of-type(1)").off("click",changePinpai);
		}
		$(".changes_main1 .change_switch_"+changedNum2).css({"top":changedTop+"px","left":changedLeft+"px"});
		if(changedTop >= 152){
			$(".changes_main1 .change_switch_"+changedNum2).css({"top":"0px","left":"0px","z-index":"0"});
			$(".change_switch_"+changedNum2).html("");
			clearInterval(changedTimer);
			setTimeout(function(){
				$(".changes_topRt_1>a:nth-of-type(1)").on("click",changePinpai);
			},500);
		}
	},10);

	if(changedNum == 1){
		changedNum = 2;
	}else{
		changedNum = 1;
	}
	index_main_change(changedNum);
	setTimeout(function(){
		$(".changes_main1 .change_switch_"+changedNum).css({"top":"0px","left":"0px","z-index":"20"});
	},380);

}

// ========================= 商城团购、商城特卖 =========================
var change_html=`<p>
					<a href="http://tuan.7jia2.com/" target="_blank">参团</a>
				</p>`;


$(".changes_topRt_2>a:nth-of-type(1)").on("click",function(){
	index_main_change2("http://139.199.11.183:8080/Seven_Two/index/updateTuangou.do",".changes_main2 ul",change_html,"现价：");
})
$(".changes_topRt_3>a:nth-of-type(1)").on("click",function(){
	index_main_change2("http://139.199.11.183:8080/Seven_Two/index/updateTemai.do",".changes_main3 ul","","特卖价：");
})

var priceText = [["updateTuangou","现价：",change_html],["updateTemai","特卖价：",""]];
for(var i=1;i<=2;i++){
	(function(ss){
		var isLoad = true;
		$(window).scroll(function(){
			var windowScroll = $(window).scrollTop();
			var switchScroll = $(".content_changes>ul>li:nth-of-type("+(ss+1)+")").offset().top;
			if(switchScroll < windowScroll + $(window).height()){
				if(isLoad){
					index_main_change2("http://139.199.11.183:8080/Seven_Two/index/"+priceText[ss-1][0]+".do",".changes_main"+(ss+1)+" ul",priceText[ss-1][2],priceText[ss-1][1]);
					isLoad = false;
				}
			}
		})
	})(i)
}

// 请求数据
function index_main_change2(urls,ele,_html,priceText){
	$.ajax({
		type:"post",
		url: urls,
		async: true,
		dataType: "json",
		success:function(data){
			mainChange2(data,ele,_html,priceText);
		}

	})
}
function mainChange2(data,ele,_html,priceText){
	var _html2= "";
	for(let i=0;i<data.length;i++){
		_html2 += `<li>
					<a href="javascript:void(0)"><img src="${data[i].url}" alt=""></a>
					<div class="changes_main_pirces">
						<a href="javascript:void(0)">${data[i].gName}</a>
						<p>${priceText}<b>￥${data[i].price}.00</b></p>
						${_html}
					</div>
				</li>`;
	}
	$(ele).html(_html2);
}

// ======================= 楼层号 =====================
// 请求楼层号
$.ajax({
	type:"get",
	url:"http://139.199.11.183:8080/Seven_Two/floorManage/findFloors.do",
	async:true,
	dataType:"json",
	success: function(data){
		console.log(data);
		var floorsNum = [];
		var floorsNav_html = "";
		for(var i=0;i<data.length;i++){
			floorsNum[i] = [];
			floorsNum[i][0] = data[i].fName;
			floorsNum[i][1] = data[i].fId;
			floorsNav_html+=`<li class="main_${i+1}F" floors_id="${data[i].fId}">
								<a href="javascript:void(0)">${i+1}F</a>
								<a href="javascript:void(0)">${data[i].fName}</a>
							</li>`;
		}
		$(".main_floors>ul").html(floorsNav_html);
		floorsMains(floorsNum);
		console.log(floorsNum);
	}
})


// ====================== 楼层商品 =====================
// 楼层结构
function floorsMains(floorsNum){
	var floorContent = `<li>
							<div class="content_floor_top">
								<h2 class="title"><span>1F</span>服饰</h2>
								<div class="content_floor_topRt">
									<ul>
										<li class="hotGoods">
											<a href="javascript:void(0)" class="floorHover">
												<span>热销</span>
											</a>
										</li>
										<li class="newGoods">
											<a href="javascript:void(0)">
												<span>新品</span>
											</a>
										</li>
										<li class="goodsClass1">
											<a href="javascript:void(0)">
												<span></span>
											</a>
										</li>
										<li class="goodsClass2">
											<a href="javascript:void(0)">
												<span></span>
											</a>
										</li>
									</ul>
								</div>
							</div>
							<div class="content_floor_load">
								<div class="floor_loading">
									<img width="200" src="http://img.zcool.cn/community/012b3c599276cc0000002129ebff53.gif">
								</div>
							</div>
							<div class="content_floor_main">
								<div class="content_floor_mainLf">
									<div class="floor_mainLf_swiper">
										<div>
											<a href="javascript:void(0)" class="mainLf_sw_last mainLf_changes"></a>
										</div>
										<div class="mainLf_swBox">
											<ul></ul>   
										</div>
										<div>
											<a href="javascript:void(0)" class="mainLf_sw_next mainLf_changes"></a>
										</div>
									</div>
									<div class="floor_mainLf_list">
										<ul></ul>
									</div>
								</div>
								<div class="content_floor_mainSwiper">
									<div class="mainSwiperBox">
										<a href="javascript:void(0)" class="main_swiper_points"></a>
									</div>
									<div class="mainSwiperBtns">
										<div class="mainSwiperBtns_box">
											<span></span>
											<span></span>
											<span></span>
										</div>
									</div>
								</div>
								<div class="content_floor_mainGoods">
									<ol class="content_hotGoods"></ol>
									<ol class="content_newGoods"></ol>
									<ol class="content_goodsClass1"></ol>
									<ol class="content_goodsClass2"></ol>
								</div>
							</div>
						</li>`;
	var floorMainContent = "";
	for(var i=0;i<floorsNum.length;i++){
		floorMainContent +=floorContent;
	}
	$(".content_floor ul").html(floorMainContent);
	for(var i=0;i<floorsNum.length;i++){
		$(".content_floor>ul>li").find(".content_floor_top>h2")[i].innerHTML="<span>"+(i+1)+"F</span>"+floorsNum[i][0];
		$(".mainSwiperBox .main_swiper_points")[i].className += " main_swiper_points_"+i;
		$(".mainSwiperBtns .mainSwiperBtns_box")[i].className +=" mainSwiperBtns_box_"+i;
		$(".content_floor>ul>li")[i].className = "content_"+(i+1)+"F";
		$(".content_floor>ul>li")[i].dataset.floor = 1;
		$(".content_floor>ul>li")[i].dataset.floorId = floorsNum[i][1];
		$(".content_floor>ul>li").find(".content_floor_mainGoods")[i].className += " floor_mainGoods_"+(i+1);
	}
	mainFloorsContent();
}
function mainFloorsContent(){
	// 懒加载的原理是基于判断元素是否出现在窗口可视范围内，
	// 首先我们写一个函数判断元素是否出现在可视范围内
	function isVisible(num){
	    var winH = $(window).height();
	    var scrollTop = $(window).scrollTop();
	    var offSetTop = $(".content_"+num+"F").offset().top;
	    if (offSetTop < winH + scrollTop&&$(".content_"+num+"F").attr("data-floor")==1) {
	    	$(".content_"+num+"F").attr("data-floor","0");
	        return true;
	    } else {
	        return false;
	    }
	}
	// 初始状态
	// 再添加上浏览器的事件监听函数，让浏览器每次滚动就检查元素是否出现在窗口可视范围内
	var numFloor = 1;
	for(var i=1;i<= $(".content_floor>ul>li").length ;i++){
		console.log("22222222222222222");
		console.log($(".content_floor>ul>li"));

		(function(num){
			$(window).on("scroll", function(){
				if (isVisible(num)){
			        goods("hotGoods",num,".content_hotGoods",$(".content_floor>ul>li")[num-1].dataset.floorId);
			    }
			    if($(".content_1F").offset().top<$(window).scrollTop()+$(window).height()){
			    	$(".main_floors").css("display","block");
			    }else{
			    	$(".main_floors").css("display","none");
			    }
			    if(Number($(".content_"+num+"F").offset().top) <= Number($(window).scrollTop())){
			    	$(".main_"+numFloor+"F a:nth-of-type(1)").css("display","block");
			    	$(".main_"+num+"F a:nth-of-type(1)").css("display","none");
			    	numFloor = num;
			    }
			    if($(".content_"+num+"F .floor_mainLf_list ul").html()!=""){
			    	$(".content_"+num+"F .content_floor_load").remove();
			    }
			})
		})(i);

	}
	var disShow = "";
	$(".main_floors ul li").on("mouseover",function(){
		disShow = $(this).find("a:nth-of-type(1)").css("display");
		$(this).find("a:nth-of-type(1)").css("display","none");
		$(this).find("a:nth-of-type(2)").css({"color":"#fff","background":"url('../img/line.png') 0 0 no-repeat #90c320"});
	})
	$(".main_floors ul li").on("mouseout",function(){
		$(this).find("a:nth-of-type(1)").css("display",disShow);
		$(this).find("a:nth-of-type(2)").css({"color":"#90c320","background":"url('../img/line.png') 0 0 no-repeat"});
	})
	$(".main_floors ul li").each(function(index){
		$(this).click(function(){
			$(window).scrollTop($(".content_"+($(this).index()+1)+"F").offset().top);
		})
	})

	// 楼层商品头部列表
	$(".content_floor_topRt").each(function(index){
		var floorHover = 0;
		$(this).find("ul>li").on("mouseover",function(){
			$(".content_"+(index+1)+"F .content_floor_topRt>ul>li:nth-of-type("+(floorHover+1)+")>a").css({"height": "29px","border": "1px solid #ededed","border-left": "0px solid #ededed","border-bottom": "2px solid #90c320"});
			$(this).children().css({"height": "27px","border-top": "4px solid #90c320","border-left": "1px solid #90c320","border-right": "1px solid #90c320","border-bottom":"1px solid #fff"});
			$(".floor_mainGoods_"+(index+1)+" ol:nth-of-type("+(floorHover+1)+")").css("opacity","0");
			floorHover = $(this).index();
			$(".floor_mainGoods_"+(index+1)+" ol:nth-of-type("+(floorHover+1)+")").css("opacity","1");
		})
	});

	// 切换数据
	var flswiperImgs = [];
	for(var i=0;i<5;i++){
		flswiperImgs[i] = [];
	}
	function goods(goodsData,num,ele,fId){
		$.ajax({
			type:"get",
			url:"http://139.199.11.183:8080/Seven_Two/index/showFloor.do",
			async: true,
			data:{fId:fId},
			dataType:"json",
			success:function(data){
				console.log(data);
				for(var i=0;i<data.carousels.length;i++){
					flswiperImgs[num-1][i] = data.carousels[i].cName;
				}   
				floorSwiper(flswiperImgs[num-1],num-1); 
				mainSwiper(data["brands"],num);	
				floorList(data["categories"],num)
				$(".content_"+num+"F .goodsClass1 span").html(data["title"][0].cName);
				$(".content_"+num+"F .goodsClass2 span").html(data["title"][1].cName);
				goodsShow(data[goodsData],num,ele);
				(function(i){
					$(".content_"+i+"F .content_floor_topRt ul .newGoods").one("mouseover",function(){
						goodsShow(data["newGoods"],i,".content_newGoods");
					});
					$(".content_"+i+"F  .content_floor_topRt ul .goodsClass1").one("mouseover",function(){
						goodsShow(data["t1Goods"],i,".content_goodsClass1");
					});
					$(".content_"+i+"F  .content_floor_topRt ul .goodsClass2").one("mouseover",function(){
						goodsShow(data["t2Goods"],i,".content_goodsClass2");
					});
				})(num);
				
			}
		});
	}
}



function goodsShow(data,num,ele){
	// 商品展示
	$(".floor_mainGoods_"+num+" "+ele).html("");
	for(var i=0;i<data.length;i++){
		var goodsShow_html = `<dl>
							<a href="http://139.199.11.183:8080/Seven_Two/resource/views/sevenAddtwo/html/babymain.html?gId=${data[i].gId}" target="_blank"><img src="${data[i].url}"></a>
							<div class="mainGoods">
								<div class="mainGoods_name">
									<a href="javascript:void(0)" title="${data[i].gName}">${data[i].gName}</a>
								</div>
								<div class="mainGoods_price">
									<a href="http://139.199.11.183:8080/Seven_Two/resource/views/sevenAddtwo/html/babymain.html?gId=${data[i].gId}" target="_blank">￥${data[i].price}.00</a>
								</div>
							</div>
						</dl>`;
		$(".floor_mainGoods_"+num+" "+ele).html($(".floor_mainGoods_"+num+" "+ele).html()+goodsShow_html);
	}
}
// ============== 楼层品牌轮播图
function mainSwiper(data,num){
	function _html(index){
		return `<li>
					<a href="http://www.7jia2.com/brand?bId=${data[index].bId}"><img src='${data[index].url}' alt='${data[index].bName}'></a>
				</li>`
	}
	// console.log($(".content_"+num+"F .mainLf_sw_next"));
	$(".content_"+num+"F .mainLf_swBox ul").html(""+_html(data.length-3)+_html(data.length-2)+_html(data.length-1));
	for(var i=0;i<data.length;i++){
		$(".content_"+num+"F .mainLf_swBox ul").html($(".content_"+num+"F .mainLf_swBox ul").html()+_html(i));
	}
	$(".content_"+num+"F .mainLf_swBox ul").html($(".content_"+num+"F .mainLf_swBox ul").html()+_html(0)+_html(1)+_html(2));
	var _index=3;
	function next(box){
		_index++;
		if(_index==data.length+3){
			_index=3;
			box.style.top="-156px";
		}
		moveWidthIndex(box);
	}
	function pre(box){
		_index--;
		if(_index== 0){
			box.style.top=(-(data.length)*52)+"px";
			_index=data.length;
		}
		moveWidthIndex(box);
	}
	function moveWidthIndex(box){
		var moveTimer;
		console.log(box.offsetTop);
		// 需要移动的距离
		var l = (_index*-52) - box.offsetTop;
		var count=0;
		clearInterval(moveTimer);
		moveTimer = setInterval(function(){
			count++;
			box.style.top= (box.offsetTop+l/10) +"px";
			if(count>=10){
				clearInterval(moveTimer);
				// 调整偏差
				box.style.top=(_index*-52)+"px";
			}
		},50)
	}
	$(".content_"+num+"F .mainLf_sw_last").on("click",function(){
		pre($(".content_"+num+"F .mainLf_swBox ul")[0]);
	})
	$(".content_"+num+"F .mainLf_sw_next").on("click",function(){
		next($(".content_"+num+"F .mainLf_swBox ul")[0]);
	})
}




// ============== 首页楼层左边目录
function floorList(data,num){
	for(var i=0;i<data.length;i++){
		var floorList_html = `<li>
								<a href="http://139.199.11.183:8080/Seven_Two/resource/views/sevenAddtwo/html/goodlist.html?cId=${data[i].cId}" target="_blank" title="${data[i].cName}">${data[i].cName}</a>
							</li>`
		$(".content_"+num+"F .floor_mainLf_list ul").html($(".content_"+num+"F .floor_mainLf_list ul").html()+floorList_html);
	}
}


// ============== 首页楼层商品轮播图

// 请求楼层商品轮播图数据
function floorSwiper(flswiperImgs,index){
	var flswiperLen = 20;
	$(".content_floor_mainSwiper .main_swiper_points_"+index).css("backgroundImage","url("+flswiperImgs[0]+")");
	swiperFun(".content_floor_mainSwiper .main_swiper_points_"+index,".mainSwiperBtns .mainSwiperBtns_box_"+index+" span",flswiperImgs,"#90c320","onmouseover",flswiperLen);

}

// ========== 轮播图函数 =========
function swiperFun(pointsEle,btnEle,Imgs,btnColors,event,len){
	// 获取图片元素
	var swiperPoints = $(pointsEle);
	// 获取按钮元素
	var swiperBtns = $(btnEle);
	// 设置按钮盒子宽度
	$(btnEle).parent().css("width",$(btnEle).length*len+"px");
	// 自动轮播
	var count=0;
	for(var i=0;i<swiperBtns.length;i++){
		swiperBtns[i].dataset.count = i;
	}
	var timer;
	function indexSwiperTime(swiperBg,btn_color){
	 	timer = setInterval(function(){
			swiperBtns[count].style.background = "#fff";
			if(count>=Imgs.length-1){
				count=-1;
			}
			count++;
			for(var i=0;i<swiperBg.length;i++){
				swiperBg[i].style.transition = "0.1s ease-in-out";
				swiperBg[i].style.backgroundImage = "url("+Imgs[count]+")";
			}
			swiperBtns[count].style.background = btn_color;
		},4000);
	 }
	 indexSwiperTime(swiperPoints,btnColors);
	// 点击切换轮播图
	for(var i=0;i<swiperBtns.length;i++){
		swiperBtns[i][event] = function(){
			clearInterval(timer);
			swiperBtns[count].style.background = "#fff";
			count = this.dataset.count;
			swiperBtns[count].style.background = btnColors;
			for(var i=0;i<swiperPoints.length;i++){
				swiperPoints[i].style.transition = "0.3s ease-in-out";
				swiperPoints[i].style.backgroundImage = "url("+Imgs[count]+")";
			}
			indexSwiperTime(swiperPoints,btnColors);
		}
	}
}

// --------------------------- 底部广告 --------------------
function index_advert_list(data){
	for(var i=0;i<data.bottomGoods.length;i++){
		var advert_html = `<li>• <a href="" target="_blank">${data.bottomGoods[i].gName}</a></li>`;
		$(".index_advert_lfr_list ul").html($(".index_advert_lfr_list ul").html()+advert_html);
	}
}














