// ------------------------- 左边菜单栏开始 ------------------------------------------------
$.ajax({
	type:"post",
	url: "http://139.199.11.183:8080/Seven_Two/menu/findMenu.do",
	async:true,
	dataType:"json",
	success: function(data){
		console.log(data);
		menuShow(data);
	}
})
function menuShow(data){
	for(var i=0;i<data.length;i++){
		var menuShow_html = `<dl>
							<dt class="menu_list_h1" showChange="1" menuId="${data[i].menuId}">${data[i].menuName}</dt>
							<dd class="menu_list_h2">
								<ul>${menuList(data[i].menuList)}</ul>
							</dd>
						</dl>`;
		$(".menu_list ol").append(menuShow_html);
	}
	menuClick();
	changeShow();
}
function menuList(menuList){
	var menuList_html = "";
	for(var i=0;i<menuList.length;i++){
		menuList_html += `<li><a href="javascript:void(0)" menuId="${menuList[i].menuId}">${menuList[i].menuName}</a></li>`;
	}
	return menuList_html;
}
// 菜单点击事件
function menuClick(){
	$(".menu_list_h1").each(function(index){
		$(this).on("click",function(){
			if($(this).attr("showChange") == "1"){
				$(this).attr("showChange","0");
				$(this).css("background","url('../img/menu_plus.gif') no-repeat 0 4px");
				$(this).siblings("dd").css("display","none");
			}else{
				$(this).attr("showChange","1");
				$(this).css("background","url('../img/menu_minus.gif') no-repeat 0 4px");
				$(this).siblings("dd").css("display","block");
			}
		})
	})
	$(".menu_title a").click(function(){
		if($(this).attr("showChange") == "1"){
			$(this).attr("showChange","0");
			$(this).find("img").attr("src","../img/menu_plus.gif");
			$(".menu_list_h1").attr("showChange","0");
			$(".menu_list_h1").css("background","url('../img/menu_plus.gif') no-repeat 0 4px");
			$(".menu_list_h2").css("display","none");
		}else{
			$(this).attr("showChange","1");
			$(this).find("img").attr("src","../img/menu_minus.gif");
			$(".menu_list_h1").attr("showChange","1");
			$(".menu_list_h1").css("background","url('../img/menu_minus.gif') no-repeat 0 4px");
			$(".menu_list_h2").css("display","block");
		}
	})
}

// ---------------------------------------- 左边菜单栏结束 ------------------------------------------------

var sellerId = 0;
// ------------------------------------------ 右边展示页开始 ----------------------------------------------
mainContop();
function mainContop(){
	var mainConTop_html=`<h2>
							<a href="http://139.199.11.183:8080/Seven_Two/resource/views/sevenAddtwo/html/ecshop.html">ECSHOP 管理中心</a>
							<span></span>
						</h2>`;
	$(".main_content_top").html(mainConTop_html);
}
// ---------------- 商品列表开始 --------------
// 商品列表初始值
var goodsCounts = 15;
var nowPage = 1;
var categoryId = 0;
var brandId = 0;
var likeName = "";
requestGoods(goodsCounts,nowPage,categoryId,brandId);
function requestGoods(goodsCounts,nowPage,categoryId,brandId){
	$.ajax({
		type:"get",
		url:"http://139.199.11.183:8080/Seven_Two/goodsManage/selectAllGoods.do",
		async:true,
		data: {count:goodsCounts,page:nowPage,categoryId:categoryId,brandId:brandId,likeName:likeName},
		dataType:"json",
		success:function(data){
			console.log(data);
			goodsConShow(data);
		}
	})
}
var onflag =true;
function goodsConShow(data){
	if(onflag){
		allSelect(data.categoryList,".allSelectClass","cId","cName");
		allSelect(data.brandList,".allSelectBrands","bId","bName");
		onflag = false;
	}
	
	goodsConList(data.goodsMap.goodsList);
	goodsMaps(data.goodsMap);
}
// 所有分类、所有品牌
function allSelect(property,ele,id,name){
	var allSelect_html = "";
	for(var i=0;i<property.length;i++){
		allSelect_html += `<option value="${property[i][id]}">${property[i][name]}</option>`;
	}
	$(ele).append(allSelect_html);
	$(".goods_list_top .allSelectClass").change(function(){
		categoryId = Number($(this).find("option:selected").val());
		requestGoods(goodsCounts,nowPage,categoryId,brandId,likeName);
	});
	$(".goods_list_top .allSelectBrands").change(function(){
		brandId = Number($(this).find("option:selected").val());
		requestGoods(goodsCounts,nowPage,categoryId,brandId,likeName);
	});
}

// 商品列表展示
function goodsConList(goodsList){
	$(".goods_list_table").html(`<tr class="table_title">
								<th>编号</th>
								<th>商品名称</th>
								<th>货号</th>
								<th>价格</th>
								<th>推荐排序</th>
								<th>库存</th>
								<th>操作</th>
							</tr>`);
	for(var i=0;i<goodsList.length;i++){
		var goodsConList_html =`<tr>
									<td class="goodsId">${goodsList[i].gId}</td>
									<td><span>${goodsList[i].gName}</span></td>
									<td>${goodsList[i].categoryId}</td>
									<td>${goodsList[i].price}.00</td>
									<td>${goodsList[i].gJiFen}</td>
									<td>${goodsList[i].gStock}</td>
									<td>
										<a href="" class="selectGoodsById" target="_blank"><img src="../img/icon_view.gif" alt=""></a>
										<a href="javascript:void(0)" class="updateGoodsById"><img src="../img/icon_edit.gif" alt=""></a>
										<a href="javascript:void(0)" class="deleteGoodsById"><img src="../img/icon_trash.gif" alt=""></a>
									</td>
								</tr>`;
		$(".goods_list_table").append(goodsConList_html);
	}
	selectGoodsById();
	deleteGoodsById();
	updateGoodsById();
}

// 根据商品具体id查询
function selectGoodsById(){
	$(".goods_list_table .selectGoodsById").each(function(index){
		$(this).click(function(){
			var goods_id = $(this).parent().siblings(".goodsId").html();
			console.log(goods_id);
			$(this).attr("href","http://139.199.11.183:8080/Seven_Two/resource/views/sevenAddtwo/html/select_goods.html?goodsId="+goods_id);
		})
	})
}
// 根据商品具体id修改
function updateGoodsById(){
	$(".goods_list_table .updateGoodsById").each(function(index){
		$(this).click(function(){
			console.log("1111111111");
			var goods_id = $(this).parent().siblings(".goodsId").html();
			$(".goods_listShow").css("display","none");
			$(".update_goods").css("display","block");
			console.log(goods_id);
			$.ajax({
				type:"get",
				url:"http://139.199.11.183:8080/Seven_Two/goodsManage/selectGoodsById.do",
				async:true,
				data:{goodsId: goods_id},
				dataType:'json',
				success:function(data){
					console.log(data);
					addGoodsInit(".update_goods_news ul","updateGoods");
					addGoodsBrand(".updateGoodsBrands");
					$(".update_goods_btns input[name='reset']").click(function(){
						addGoodsInit(".update_goods_news ul","updateGoods");
						addGoodsBrand(".updateGoodsBrands");
						updateMessage(data);
					})
					updateMessage(data);
					function updateMessage(data){
						$(".update_goods_news .updateGoodsName").attr("gId",data.goods.gId);
						$(".update_goods_news .updateGoodsName").val(data.goods.gName);
						$(".update_goods_news .updateGoodsClass_1").before(`<input type='text' class='UpadteClass' value="${data.categoryName}">
																			<input type='button' class='UpadteClassBtn' value='编辑'>`);
						$(".update_goods_news .updateGoodsBrands option:selected").text(data.brandName);
						console.log($(".update_goods_news .updateGoodsBrands").val())
						$(".update_goods_news .goodsPic").before(`<input type="text" value="${data.goods.url}">`);
						$(".update_goods_news .nowPrice").val(data.goods.price);
						$(".update_goods_news .marketPrice").val(data.goods.gMaketPrice);
						$(".update_goods_news .gStock").val(data.goods.gStock);
						$(".update_goods_news .gJiFen").val(data.goods.gJiFen);
						$(".update_goods_news .updateGoodsNum").parent().remove();
						$(".update_goods_news .updateGoodsClass_1").css("display","none");
						$(".update_goods_news .updateGoodsClass_2").css("display","none");
						$(".update_goods_news .updateGoodsClass_3").css("display","none");

						$(".UpadteClassBtn").click(function(){
							$(".update_goods_news .updateGoodsClass_1").css("display","inline-block");
							$(".update_goods_news .updateGoodsClass_2").css("display","inline-block");
							$(".update_goods_news .updateGoodsClass_3").css("display","inline-block");
							addGoodsClass1(".updateGoodsClass_1");
							changesSelect(".updateGoodsClass_1",".updateGoodsClass_2");
							changesSelect(".updateGoodsClass_2",".updateGoodsClass_3");
							$(this).remove();
							$(".UpadteClass").remove();
						})
						$(".update_goods_news .goodsPic").change(function(){
							$(this).siblings("input").val($(".update_goods_news .goodsPic").get(0).files[0].name);
						})
					}
					$(".update_goods_btns input[name='updateBtn']").off("click").click(function(){
						var gId = $(".update_goods_news .updateGoodsName").attr("gId");
						var gName = $(".update_goods_news .updateGoodsName").val();
						var gPrice = $(".update_goods_news .nowPrice").val();
						console.log(gPrice);
						var gMaketPrice = $(".update_goods_news .marketPrice").val();
						var gStock = $(".update_goods_news .gStock").val();
						var gJiFen = $(".update_goods_news .gJiFen").val();
						if(gId=="0"||gName==""||gPrice==""||gMaketPrice==""||gStock==""||gJiFen==""){
							alert("信息不完整，请补充完整再提交");
						}else{
							updateGoodsBtn(gId,gName,gPrice,gMaketPrice,gStock,gJiFen);
						}
					})
					
					function updateGoodsBtn(gId,gName,gPrice,gMaketPrice,gStock,gJiFen){
						$.ajax({
							type:"get",
							url:"http://139.199.11.183:8080/Seven_Two/goodsManage/updateGoodsById.do",
							async:true,
							data:{gId:gId,gName:gName,price:gPrice,gMaketPrice:gMaketPrice,gStock:gStock,gJiFen:gJiFen},
							dataType:"json",
							success:function(data){
								console.log(data);
								if(data){
									alert("修改成功");
									requestGoods(goodsCounts,nowPage,categoryId,brandId,likeName);
									$(".goods_listShow").css("display","block");
									$(".update_goods").css("display","none");
								}
							}
						})
					}
				}
			})
			
		})
	})
}

// 根据商品具体id删除
function deleteGoodsById(){
	$(".goods_list_table .deleteGoodsById").each(function(index){
		$(this).click(function(){
			var goods_id = $(this).parent().siblings(".goodsId").html();
			$.ajax({
				type:"get",
				url:"http://139.199.11.183:8080/Seven_Two/goodsManage/luojiDelete.do",
				async:true,
				data:{gId:goods_id},
				dataType:"json",
				success:function(data){
					console.log(data);
					if(data){
						requestGoods(goodsCounts,nowPage,categoryId,brandId);
					}
				}
			})
		})
	});
}

// 商品列表页数
function goodsMaps(goodsMap){
	var pages = Math.ceil(goodsMap.size/goodsCounts);
	var pages_html = "";
	for(var i=1;i<=pages;i++){
		pages_html += `<option value="${i}">${i}</option>`;
	}
	var goodsListPages = `<tr>
								<td>
									<div style="text-align:right;">
										总计<span> ${goodsMap.size} </span>个记录 分为<span> ${pages} </span>页 当前第<span> ${nowPage} </span>页, 每页
										<input type="text" name="count" value="${goodsCounts}" style="width:30px;text-align:center;">
										<input type="button" name="btn" value="确定" style="background:#5c8918;color:#fff;padding:2px 3px;" >
										<span>
											<a href="javascript:void(0)" class="firstPage"> 第一页 </a>
											<a href="javascript:void(0)" class="lastPage"> 上一页 </a>
											<a href="javascript:void(0)" class="nextPage"> 下一页 </a>
											<a href="javascript:void(0)" class="endPage"> 最后一页 </a>
										</span>
										<select class="pagesSelect">${pages_html}</select>
									</div>
								</td>
							</tr>`;
	$(".goods_list_pages").html(goodsListPages);
	pagesCtrls(pages);
	$(".pagesSelect").val(nowPage);
}

// 商品列表页码控制
function pagesCtrls(pages){
	$(".goods_list_pages input[name='btn']").click(function(){
		goodsCounts = $(".goods_list_pages input[name='count']").val();
		requestGoods(goodsCounts,nowPage,categoryId,brandId,likeName);
	})
	$(".goods_list_pages .firstPage").click(function(){
		nowPage = 1;
		requestGoods(goodsCounts,nowPage,categoryId,brandId,likeName);
	})
	$(".goods_list_pages .endPage").click(function(){
		nowPage = pages;
		requestGoods(goodsCounts,nowPage,categoryId,brandId,likeName);
	})
	$(".goods_list_pages .lastPage").click(function(){
		nowPage --;
		if(nowPage < 1){
			nowPage =1;
		}
		requestGoods(goodsCounts,nowPage,categoryId,brandId,likeName);
	})
	$(".goods_list_pages .nextPage").click(function(){
		nowPage ++;
		if(nowPage > pages){
			nowPage = pages;
		}
		requestGoods(goodsCounts,nowPage,categoryId,brandId,likeName);
	})
	$(".goods_list_pages .pagesSelect").change(function(){
		nowPage = Number($(this).find("option:selected").text());
		requestGoods(goodsCounts,nowPage,categoryId,brandId,likeName);
	})
}

// 模糊查询
$(".goods_list_top input[name='searchBtn']").click(function(){
	likeName = $(".goods_list_top input[name='keyword']").val();
	if(likeName == null){
		likeName = ""; 
	}
	requestGoods(goodsCounts,nowPage,categoryId,brandId,likeName);
})
// ------------------------ 商品列表结束 -------------------

// ------------------------ 添加新商品开始 --------------------
addGoodsInit(".add_goods_news ul","addGoods");
function addGoodsInit(ele,cName){
	var addGoods_html = `<li>
							<span>商品名称：</span>
							<input type="text" name="" size="30" class="${cName}Name">
						</li>
						<li>
							<span>商品货号：</span>
							<input type="text" name="" size="20" class="${cName}Num">
						</li>
						<li>
							<span>商品分类：</span>
							<select class="${cName}Class_1"><option value="0">请选择--</option></select>
							<select class="${cName}Class_2"><option value="0">请选择--</option></select>
							<select class="${cName}Class_3"><option value="0">请选择--</option></select>
						</li>
						<li>
							<span>商品品牌：</span>
							<select class="${cName}Brands"><option value="0">请选择--</option></select>
						</li>
						<li>
							<span>商品市场价：</span>
							<input type="text" name="" size="20" class="marketPrice">

						</li>
						<li>
							<span>商品现价：</span>
							<input type="text" name="" size="20" class="nowPrice">
						</li>
						<li>
							<span>商品库存：</span>
							<input type="number" name="" class="gStock" size="20">
						</li>
						<li>
							<span>商品积分：</span>
							<input type="number" name="" class="gJiFen" size="20">
						</li>
						<li>
							<span>上传商品图片：</span>
							<input type="file" name="file" class="goodsPic">
						</li>`;
	$(ele).html(addGoods_html);
}

// 重置
$(".add_goods_btns input[name='reset']").click(function(){
	addGoodsInit(".add_goods_news ul","addGoods");
	addGoodsClass1(".addGoodsClass_1");
	addGoodsBrand(".addGoodsBrands");
})
// 保存新商品
$(".add_goods_btns input[name='addBtn']").click(function(){
	var bId = $(".add_goods_news .addGoodsBrands option:selected").val();
	var gName = $(".add_goods_news .addGoodsName").val();
	var cId = $(".add_goods_news .addGoodsClass_3 option:selected").val();
	var add_urls = $(".add_goods_news .goodsPic").get(0).files[0].name;
	var gPrice = $(".add_goods_news .nowPrice").val();
	var gMaketPrice = $(".add_goods_news .marketPrice").val();
	var gStock = $(".add_goods_news .gStock").val();
	var gJiFen = $(".add_goods_news .gJiFen").val();
	if(bId=="0"||gName==""||cId=="0"||add_urls== undefined||gPrice==""||gMaketPrice==""||gStock==""||gJiFen==""){
		alert("信息不完整，请补充完整再提交");
	}else{
		saveGoods(bId,gName,cId,add_urls,gPrice,gMaketPrice,gStock,gJiFen);
	}
});

// 分类选择
function addGoodsClass1(ele){
	$.ajax({
		type:"get",
		url: "http://139.199.11.183:8080/Seven_Two/goodsManage/selectFirstCategory.do",
		async:true,
		dataType:"json",
		success:function(data){
			var addGoodsClass_1 = "";
			for(var i=0;i<data.firstCategory.length;i++){
				addGoodsClass_1 += `<option value="${data.firstCategory[i].cId}">${data.firstCategory[i].cName}</option>`
			}
			$(ele).append(addGoodsClass_1);
		}
	})
}
addGoodsClass1(".addGoodsClass_1");

function addGoodsClass2(ele,cId){
	$.ajax({
		type:"get",
		url:"http://139.199.11.183:8080/Seven_Two/goodsManage/selectNextCategoryById.do",
		async:true,
		data:{categoryId:cId},
		dataType:"json",
		success:function(data){
			console.log(data);
			$(ele).html("<option value='0'>请选择--</option>");
			var addGoodsClass_2 = "";
			for(var i=0;i<data.nextCategory.length;i++){
				addGoodsClass_2 += `<option value="${data.nextCategory[i].cId}">${data.nextCategory[i].cName}</option>`;
			}
			$(ele).append(addGoodsClass_2);
		}	
	})
}
function changesSelect(ele1,ele2){
	$(ele1).change(function(){
		var addClass1_categoryId = $(this).find("option:selected").val();
		addGoodsClass2(ele2,addClass1_categoryId);
	})
}

// 品牌选择
function addGoodsBrand(ele){
	$.ajax({
		type:"get",
		url:"http://139.199.11.183:8080/Seven_Two/goodsManage/showAllBrand.do",
		async:true,
		dataType:"json",
		success:function(data){
			var addGoodsBrand_html = "";
			console.log(data);
			for(var i=0;i<data.brandList.length;i++){
				addGoodsBrand_html += `<option value="${data.brandList[i].bId}">${data.brandList[i].bName}</option>`;
			}
			$(ele).append(addGoodsBrand_html);
		}
	})
}
addGoodsBrand(".addGoodsBrands");

function saveGoods(bId,gName,cId,urls,gPrice,gMaketPrice,gStock,gJiFen){
	$.ajax({
		type:"get",
		url:"http://139.199.11.183:8080/Seven_Two/goodsManage/addNewGoods.do",
		async:true,
		data:{brandId:bId,gName:gName,categoryId:cId,url:urls,gPrice:gPrice,gMaketPrice:gMaketPrice,gStock:gStock,gJiFen:gJiFen},
		success:function(data){
			console.log(data);
		}
	})
}
// ------------------------ 添加新商品结束 --------------------

// ---------------------  ----------------------

// ------------------------ 商品回收站开始 --------------------
var delGoodsCounts = 10;
var delNowPage = 1;

requestDelGoods(delGoodsCounts,delNowPage);
function requestDelGoods(delGoodsCounts,delNowPage){
	$.ajax({
		type:"get",
		url:"http://139.199.11.183:8080/Seven_Two/goodsManage/selectRecycleGoods.do",
		async:true,
		data: {count:delGoodsCounts,page:delNowPage},
		dataType:"json",
		success:function(data){
			console.log(data);
			delGoodsList(data.goodsList);
			delGoodsMaps(data);
		}
	})
}
// 回收站列表展示
function delGoodsList(goodsList){
	$(".del_goods_table").html(`<tr class="table_title">
								<th>编号</th>
								<th>商品名称</th>
								<th>货号</th>
								<th>价格</th>
								<th>操作</th>
							</tr>`);
	for(var i=0;i<goodsList.length;i++){
		var delgoodsConList_html =`<tr>
									<td class="goodsId">${goodsList[i].gId}</td>
									<td><span>${goodsList[i].gName}</span></td>
									<td>${goodsList[i].categoryId}</td>
									<td>${goodsList[i].price}.00</td>
									<td>
										<a href="javascript:void(0)" class="redelGoodsById" style="color:#9ab33f">还原</a>
										<span> | </span>
										<a href="javascript:void(0)" class="deleteGoodsById" style="color:#9ab33f">删除</a>
									</td>
								</tr>`;
		$(".del_goods_table").append(delgoodsConList_html);
		
	}
	huifuDelGoods();
	deleteGoods();
}
// 回收站还原
function huifuDelGoods(){
	$(".del_goods_table .redelGoodsById").click(function(){
		var goods_id = $(this).parent().siblings(".goodsId").html();
		$.ajax({
			type:"get",
			url:"http://139.199.11.183:8080/Seven_Two/goodsManage/huiFuGoods.do",
			async:true,
			data:{gId:goods_id},
			dataType:"json",
			success:function(data){
				if(data){
					requestDelGoods(delGoodsCounts,delNowPage);
				}
			}
		})
	})
}
// 回收站彻底删除
function deleteGoods(){
	$(".del_goods_table .deleteGoodsById").click(function(){
		$(this).parent().parent().remove();
	})
}
// 回收站页码
function delGoodsMaps(goodsMap){
	var pages = Math.ceil(goodsMap.size/delGoodsCounts);
	var pages_html = "";
	for(var i=1;i<=pages;i++){
		pages_html += `<option value="${i}">${i}</option>`;
	}
	var goodsListPages = `<tr>
								<td>
									<div style="text-align:right;">
										总计<span> ${goodsMap.size} </span>个记录 分为<span> ${pages} </span>页 当前第<span> ${delNowPage} </span>页, 每页
										<input type="text" name="count" value="${delGoodsCounts}" style="width:30px;text-align:center;">
										<input type="button" name="btn" value="确定" style="background:#5c8918;color:#fff;padding:2px 3px;" >
										<span>
											<a href="javascript:void(0)" class="firstPage"> 第一页 </a>
											<a href="javascript:void(0)" class="lastPage"> 上一页 </a>
											<a href="javascript:void(0)" class="nextPage"> 下一页 </a>
											<a href="javascript:void(0)" class="endPage"> 最后一页 </a>
										</span>
										<select class="pagesSelect">${pages_html}</select>
									</div>
								</td>
							</tr>`;
	$(".del_goods_pages").html(goodsListPages);
	delpagesCtrls(pages);
	$(".del_goods_pages .pagesSelect").val(delNowPage);
}
// 回收站页码控制
function delpagesCtrls(pages){
	$(".del_goods_pages input[name='btn']").click(function(){
		delGoodsCounts = $(".del_goods_pages input[name='count']").val();
		requestDelGoods(delGoodsCounts,delNowPage);
	})
	$(".del_goods_pages .firstPage").click(function(){
		delNowPage = 1;
		requestDelGoods(delGoodsCounts,delNowPage);
	})
	$(".del_goods_pages .endPage").click(function(){
		delNowPage = pages;
		requestDelGoods(delGoodsCounts,delNowPage);
	})
	$(".del_goods_pages .lastPage").click(function(){
		delNowPage --;
		if(delNowPage < 1){
			delNowPage =1;
		}
		requestDelGoods(delGoodsCounts,delNowPage);
	})
	$(".del_goods_pages .nextPage").click(function(){
		delNowPage ++;
		if(delNowPage > pages){
			delNowPage = pages;
		}
		requestDelGoods(delGoodsCounts,delNowPage);
	})
	$(".del_goods_pages .pagesSelect").change(function(){
		delNowPage = Number($(this).find("option:selected").text());
		requestDelGoods(delGoodsCounts,delNowPage);
	})
}

// ------------------------ 商品回收站结束 --------------------

// ------------------------ 楼层管理开始 ----------------------
function floorInit(ele,floorList){
	$(ele).html(`<tr class="table_title">
								<th>编号</th>
								<th>楼层号</th>
								<th>楼层名</th>
								<th>操作</th>
							</tr>`);
	for(var i=0;i<floorList.length;i++){
		var select_floor =`<tr>
								<td class="goodsId"> ${floorList[i].fId}</td>
								<td style="width:auto;">${floorList[i].fId}F</td>
								<td>${floorList[i].fName}</td>
								<td>
									<a href="javascript:void(0)" class="updateFloorById" style="color:#9ab33f">修改</a>
									<span> | </span>
									<a href="javascript:void(0)" class="deleteFloorById" style="color:#9ab33f">删除</a>
								</td>
							</tr>`;
		$(ele).append(select_floor);
	}
	$(".select_floor_update").css("display","none");
	$(".select_floor_contain").css("display","block");
	selectFloorById();
}
// 查询页修改楼层信息
function selectFloorById(){
	$(".select_floor .updateFloorById").off("click").on("click",function(){
		console.log("1111111111111");
		$(".select_floor_contain").css("display","none");
		$(".select_floor_update").css({"display":"block"});
		var _floorNum = $(this).parent().siblings(".goodsId").html();
		$(".floor_updated").html(`<h3>更改楼层名称：</h3>
									楼层号　：${_floorNum}F
									<br>
									新楼层名：<input type="text" name="" class="newFloorName" placeholder="新楼层名">
									<br>
									<input type="button" name="" class="updatedFloorsBtn" value="确定">`);
		$(".floor_updated .updatedFloorsBtn").off("click").on("click",function(){
			var newFloorName = $(".floor_updated .newFloorName").val();
			$.ajax({
				type:"get",
				url:"http://139.199.11.183:8080/Seven_Two/floorManage/changeFloorName.do",
				async:true,
				data:{fId:_floorNum,newName:newFloorName},
				dataType:"json",
				success:function(data){
					if(data){
						alert("楼层名称修改成功");
						requestSelectFloor();
						$(".select_floor_contain").css("display","block");
						$(".select_floor_update").css("display","none");
					}else{
						alert("楼层名称修改失败，请检查该楼层是否存在")
					}
				}
			})
		})
	})
}
// 查询楼层信息
function requestSelectFloor(){
	$.ajax({
		type:"get",
		url:"http://139.199.11.183:8080/Seven_Two/floorManage/findFloors.do",
		async:true,
		dataType: "json",
		success: function(data){
			console.log(data);
			floorInit(".select_floor_table",data);
			floorInit(".delete_floor_table",data);
			$(".delete_floor_table .updateFloorById").remove();
			$(".delete_floor_table span").remove();
			deleteFloor();
		}
	})
}
// 交换楼层
function exchangeFloor(){
	$(".exchange_floor").html(`<h3>交换楼层：</h3>
								<input type="number" name="" style="width: 40px;" class="FloorId1" placeholder="楼号1"> F
								<span style="color: #90c320;font-size: 14px;">　<->　</span>
								<input type="number" name="" style="width: 40px;" class="FloorId2" placeholder="楼号2"> F
								<span style="font-size: 12px;">　(只能输入数字)</span>
								<br>
								<input type="button" class="exchangeFloorsBtn" value="交换">`);
	$(".exchange_floor .exchangeFloorsBtn").off("click").on("click",function(){
		var fId1 = $(".exchange_floor .FloorId1").val();
		var fId2 = $(".exchange_floor .FloorId2").val();
		$.ajax({
			type:"get",
			url:"http://139.199.11.183:8080/Seven_Two/floorManage/exchangeFloor.do",
			async:true,
			data:{fId1:fId1,fId2:fId2},
			dataType: "json",
			success: function(data){
				console.log(data);
				if(data){
					alert("楼层交换成功");
					exchangeFloor();
				}else{
					alert("楼层交换失败,请检查楼层是否存在");
				}
			}
		})
	})
}
// 修改楼层名称
function update_floorMessage(){
	$(".update_floorMessage").html(`<h3>更改楼层名称：</h3>
									楼层号　：<input type="number" name="" style="width: 30px;" class="oldFloorId" placeholder="楼号"> F
									<span style="font-size: 12px;">　(只能输入数字)</span>
									<br>
									新楼层名：<input type="text" name="" class="newFloorName" placeholder="新楼层名">
									<br>
									<input type="button" name="" class="updatedFloorsBtn" value="确定">`);
	$(".update_floorMessage .updatedFloorsBtn").off("click").on("click",function(){
		var fId = $(".update_floorMessage .oldFloorId").val();
		var newFloorName = $(".update_floorMessage .newFloorName").val();
		$.ajax({
			type:"get",
			url:"http://139.199.11.183:8080/Seven_Two/floorManage/changeFloorName.do",
			async:true,
			data:{fId:fId,newName:newFloorName},
			dataType:"json",
			success:function(data){
				if(data){
					alert("楼层名称修改成功");
					update_floorMessage()
				}else{
					alert("楼层名称修改失败，请检查该楼层是否存在")
				}
			}
		})
	})
}
// 删除楼层
function deleteFloor(){
	console.log($(".delete_floor_table .deleteFloorById"));
	$(".deleteFloorById").off("click").on("click",function(){
		var fId = $(this).parent().siblings(".goodsId").html();
		console.log(fId);
		deleteRequest(fId);
	})
}
function deleteRequest(fId){
	$.ajax({
		type:"get",
		url:"http://139.199.11.183:8080/Seven_Two/floorManage/deleteFloor.do",
		async:true,
		data:{fId:fId},
		dataType:"json",
		success:function(data){
			console.log(data);
			if(data){
				requestSelectFloor();
				alert(fId+"F楼层删除成功")
			}else{
				alert(fId+"F楼层删除失败")
			}
		}
	})
}
// 恢复楼层
function huifuFloor(){
	$.ajax({
		type:"get",
		url:"http://139.199.11.183:8080/Seven_Two/floorManage/findHasDeleted.do",
		async:true,
		dataType:"json",
		success:function(data){
			console.log(data);
			if(data.length ==0){
				$(".huifu_floor_table").html("<tr><td style='color: #dde7c8;font-size:30px;padding:20px 0;'>还没有楼层被删除</td></tr>");
			}else{
				floorInit(".huifu_floor_table",data);
				$(".huifu_floor_table .deleteFloorById").remove();
				$(".huifu_floor_table span").remove();
				$(".huifu_floor_table .updateFloorById").attr("class","huifuFloorById")
				$(".huifu_floor_table .huifuFloorById").html("恢复");
			}
			$(".huifu_floor_table .huifuFloorById").click(function(){
				var fId = $(this).parent().siblings(".goodsId").html();
				$.ajax({
					type:"get",
					url:"http://139.199.11.183:8080/Seven_Two/floorManage/replaceFloor.do",
					async:true,
					data:{fId:fId},
					dataType:"json",
					success:function(data){
						if(data){
							alert("该楼层成功恢复");
							huifuFloor();
						}else{
							alert("该楼层恢复失败");
						}
					}
				})
			})
		}
	})
	
}

// ------------------------ 楼层管理结束 ----------------------

// ------------------------ 订单管理开始 ----------------------
var orderGoodsCounts = 10;
var orderNowPage = 1;
var state = "2";
var receiveName = "";
// 订单列表
function orederRequest(orderGoodsCounts,orderNowPage){
	$(".selectOneOrder").css("display","none");
	$(".order_goods_contain").css("display","block");
	$.ajax({
		type:"get",
		url:"http://139.199.11.183:8080/Seven_Two/orderManage/findAllOrders.do",
		async:true,
		data:{count:orderGoodsCounts,page:orderNowPage},
		dataType:"json",
		success:function(data){
			console.log(data);
			orderGoodsConList(data.orderList);
			orderGoodsMaps(data);
		}
	})
}
function orderGoodsConList(goodsList){
	$(".order_goods_table").html(`<tr class="table_title">
								<th>订单号</th>
								<th>下单时间</th>
								<th>购买用户</th>
								<th>收货人</th>
								<th>总金额</th>
								<th>订单状态</th>
								<th>操作</th>
							</tr>`);
	for(var i=0;i<goodsList.length;i++){
		var goodsConList_html =`<tr>
									<td class="orderId">${goodsList[i].oId}</td>
									<td><span>${goodsList[i].order_time}</span></td>
									<td>${goodsList[i].user.username}</td>
									<td>${goodsList[i].receive.name}</td>
									<td>${goodsList[i].totalMoney}.00</td>
									<td>${orderState(goodsList[i].state)}</td>
									<td>
										<a href="javascript:void(0)" class="selectOrderById" style="color:#9ab33f">查看</a>
										<span> | </span>
										<a href="javascript:void(0)" class="deleteOrderById" style="color:#9ab33f">移除</a>
									</td>
								</tr>`;
		$(".order_goods_table").append(goodsConList_html);
	}
	selectOneOrder();
	deleteOneOrder();
}

function orderState(state){
	if(state == 2){
		return "已取消";
	}else if(state == 1){
		return "已付款";
	}else if(state == 0){
		return "待付款";
	}
}
function orderGoodsMaps(goodsMap){
	var pages = Math.ceil(goodsMap.allNum/orderGoodsCounts);
	console.log(goodsMap.allNum);
	var pages_html = "";
	for(var i=1;i<=pages;i++){
		pages_html += `<option value="${i}">${i}</option>`;
	}
	var goodsListPages = `<tr>
							<td>
								<div style="text-align:right;">
									总计<span> ${goodsMap.allNum} </span>个记录 分为<span> ${pages} </span>页 当前第<span> ${orderNowPage} </span>页, 每页
									<input type="text" name="count" value="${orderGoodsCounts}" style="width:30px;text-align:center;">
									<input type="button" name="btn" value="确定" style="background:#5c8918;color:#fff;padding:2px 3px;" >
									<span>
										<a href="javascript:void(0)" class="firstPage"> 第一页 </a>
										<a href="javascript:void(0)" class="lastPage"> 上一页 </a>
										<a href="javascript:void(0)" class="nextPage"> 下一页 </a>
										<a href="javascript:void(0)" class="endPage"> 最后一页 </a>
									</span>
									<select class="pagesSelect">${pages_html}</select>
								</div>
							</td>
						</tr>`;
	$(".order_goods_pages").html(goodsListPages);
	orderPagesCtrls(pages);
	$(".order_goods_pages .pagesSelect").val(orderNowPage);
}
// 商品列表页码控制
function orderPagesCtrls(pages){
	$(".order_goods_pages input[name='btn']").click(function(){
		orderGoodsCounts = $(".order_goods_pages input[name='count']").val();
		orederRequest(orderGoodsCounts,orderNowPage,state,receiveName);
	})
	$(".order_goods_pages .firstPage").click(function(){
		orderNowPage = 1;
		orederRequest(orderGoodsCounts,orderNowPage,state,receiveName);
	})
	$(".order_goods_pages .endPage").click(function(){
		orderNowPage = pages;
		orederRequest(orderGoodsCounts,orderNowPage,state,receiveName);
	})
	$(".order_goods_pages .lastPage").click(function(){
		orderNowPage --;
		if(orderNowPage < 1){
			orderNowPage =1;
		}
		orederRequest(orderGoodsCounts,orderNowPage,state,receiveName);
	})
	$(".order_goods_pages .nextPage").click(function(){
		orderNowPage ++;
		if(orderNowPage > pages){
			orderNowPage = pages;
		}
		orederRequest(orderGoodsCounts,orderNowPage,state,receiveName);
	})
	$(".order_goods_pages .pagesSelect").change(function(){
		orderNowPage = Number($(this).find("option:selected").text());
		orederRequest(orderGoodsCounts,orderNowPage,state,receiveName);
	})
}
// 查看某个订单
function selectOneOrder(){
	$(".selectOrderById").off("click").on("click",function(){
		var orderId = $(this).parent().siblings(".orderId").html();
		console.log(orderId);
		sellerId = 9;
		$.ajax({
			type:"get",
			url:"http://139.199.11.183:8080/Seven_Two/orderManage/findOneOrder.do",
			async:true,
			data:{oId:orderId},
			dataType:"json",
			success:function(data){
				console.log(data);
				$(".selectOneOrder").css("display","block");
				$(".order_goods_contain").css("display","none");
				selectOneOrderList(".selectOneOrder_table1","订单号","购买用户","总金额","下单时间","订单状态","","",data.oId,data.user.username,data.totalMoney,data.order_time,data.state,"","");
				$(".selectOneOrder_table1 th:nth-last-of-type(1)").remove();
				$(".selectOneOrder_table1 th:nth-last-of-type(2)").remove();
				$(".selectOneOrder_table1 td:nth-last-of-type(1)").remove();
				$(".selectOneOrder_table1 td:nth-last-of-type(2)").remove();
				selectOneOrderList(".selectOneOrder_table2","收货人姓名","固定电话","移动电话","所在地区","详细地址","邮政编码","",data.receive.name,data.receive.telephone,data.receive.moblie,data.receive.area,data.receive.address,data.receive.code,"");
				$(".selectOneOrder_table2 th:nth-last-of-type(1)").remove();
				$(".selectOneOrder_table2 td:nth-last-of-type(1)").remove();
				selectOneOrderList2(data.items);
			}
		})
	})
}

// 删除某个订单
function deleteOneOrder(){
	$(".deleteOrderById").off("click").on("click",function(){
		var orderId = $(this).parent().siblings(".orderId").html();
		$.ajax({
			type:"get",
			url:"http://139.199.11.183:8080/Seven_Two/orderManage/deleteOrder.do",
			async:true,
			data:{oId:orderId},
			dataType:"json",
			success:function(data){
				if(data){
					alert("成功删除订单");
					orederRequest(orderGoodsCounts,orderNowPage);
				}else{
					alert("删除订单失败");
				}
			}
		})
	})
}

function selectOneOrderList(ele,th1,th2,th3,th4,th5,th6,th7,td1,td2,td3,td4,td5,td6,td7){
	$(ele).html(`<tr class="table_title">
								<th>${th1}</th>
								<th>${th2}</th>
								<th>${th3}</th>
								<th>${th4}</th>
								<th>${th5}</th>
								<th>${th6}</th>
								<th>${th7}</th>
							</tr>`);
		var goodsConList_html =`<tr>
									<td class="orderId">${td1}</td>
									<td><span>${td2}</span></td>
									<td>${td3}</td>
									<td>${td4}</td>
									<td>${td5}</td>
									<td>${td6}</td>
									<td>${td7}</td>
								</tr>`;
		$(ele).append(goodsConList_html);
}
function selectOneOrderList2(data){
	$(".selectOneOrder_table3").html(`<tr class="table_title">
										<th>编号</th>
										<th>商品名称</th>
										<th>商品颜色</th>
										<th>商品规格</th>
										<th>单价</th>
										<th>小计</th>
										<th>库存</th>
									</tr>`);
	for(var i=0;i<data.length;i++){
		var goodsConList_html =`<tr>
								<td class="orderId">${data[i].gId}</td>
								<td><span>${data[i].gName}</span></td>
								<td>${data[i].color}</td>
								<td>${data[i].size}.00</td>
								<td>${data[i].price}</td>
								<td>${data[i].subtotal}</td>
								<td>${data[i].gStock}</td>
							</tr>`;
		$(".selectOneOrder_table3").append(goodsConList_html);
	}	
}
$(".selectOrderBack").off("click").on("click",function(){
	$(".selectOneOrder").css("display","none");
	$(".order_goods_contain").css("display","block");
})
// 订单查询
$(".orderSelectSearchBtn").off("click").on("click",function(){
	var oId = $(this).siblings(".orderSelect_oId").val();
	console.log(oId);
	var name = $(this).siblings(".orderSelect_name").val();
	if(oId==""&&name==""){
		selectOrderSeach("");
	}else if(oId!=""){
		var formData = {oId:oId};
		selectOrderSeach(formData);
	}else if(name!=""){
		var formData = {name:name};
		selectOrderSeach(formData);
	}else if(oId!=""&&name!=""){
		var formData = {oId:oId,name:name};
		selectOrderSeach(formData);
	}
})
function selectOrderSeach(formData){
	$.ajax({
		type:"get",
		url:"http://139.199.11.183:8080/Seven_Two/orderManage/findByDetails.do",
		async:true,
		data: formData,
		dataType:"json",
		success:function(data){
			console.log(data);
			selectOrderLists(data.orderList);
		}
	})
}

function selectOrderLists(data){
	$(".orderGoodsSelect_table").html(`<tr class="table_title">
										<th>订单号</th>
										<th>下单时间</th>
										<th>购买用户</th>
										<th>收货人</th>
										<th>总金额</th>
										<th>订单状态</th>
										<th>联系方式</th>
									</tr>`);
	for(var i=0;i<data.length;i++){
		var goodsConList_html =`<tr>
								<td class="orderId">${data[i].oId}</td>
								<td><span>${data[i].order_time}</span></td>
								<td>${data[i].user.username}</td>
								<td>${data[i].receive.name}</td>
								<td>${data[i].totalMoney}</td>
								<td>${orderState(data[i].state)}</td>
								<td>${data[i].receive.mobile}</td>
							</tr>`;
		$(".orderGoodsSelect_table").append(goodsConList_html);
	}	
}
// ------------------------ 订单管理结束 ----------------------


// ------------------------ 评论管理开始 ----------------------
function commentManage(){
	$.ajax({
		type:"get",
		url:"http://139.199.11.183:8080/Seven_Two/details/findAllComment.do",
		async:true,
		dataType:"json",
		success:function(data){
			console.log(data);
			commentList(data);
		}
	})
}
function commentList(data){
	$(".commentManage_table").html(`<tr class="table_title">
										<th><input type="checkbox" class="commentSelectAll" value="0"/> 编号</th>
										<th>用户名</th>
										<th>商品名称</th>
										<th>评论内容</th>
										<th>评论日期</th>
									</tr>`);
	for(var i=0;i<data.length;i++){
		var goodsConList_html =`<tr>
								<td class="commentId"><input type="checkbox" class="commentSelect" value="${data[i].commentId}"/> ${data[i].commentId}</td>
								<td>${data[i].user.username}</td>
								<td><span >${data[i].goods.gName}</span></td>
								<td style="width:200px;">${data[i].commentInfo}</td>
								<td style="width:200px;">${data[i].commentDate}</td>
							</tr>`;
		$(".commentManage_table").append(goodsConList_html);
	}
	$(".commentSelectAll").off("click").on("click",function(){
		console.log($(this).is(":checked"));
		$(".commentSelect").prop("checked",$(this).is(':checked'));
		console.log($(".commentSelect").is(":checked"));
	})
	$(".commentSelect").each(function(index){
		$(this).off("click").on("click",function(){
			if($(".commentSelect:checked").length==$(".commentSelect").length){
				$(".commentSelectAll").prop("checked",true);
			}else{
				$(".commentSelectAll").prop("checked",false);
			}
		})
	})
	commentShow();
}
function commentShow(){
	$(".commentBtn").off("click").on("click",function(){
		var isShow = $(this).siblings("select").find("option:selected").val();
		console.log(isShow);
		var commentId = "";
		$(".commentSelect:checked").each(function(index){
			commentId += "commentId="+$(this).val()+"&";
		});
		_commentId = commentId.substr(0,commentId.length - 1);
		console.log(_commentId);
		if(isShow == 0){
			commentManage();
		}else if(isShow == 1){
			batchShow(commentId);
		}else{
			batchHidden(commentId);
		}
	})
}
function batchShow(commentId){
	$.ajax({
		type:"get",
		url:"http://139.199.11.183:8080/Seven_Two/details/showComment.do",
		async:true,
		data:commentId,
		dataType:"json",
		success:function(data){
			console.log(data);
			if(data){
				$(".commentSelect").each(function(){
					if($(this).is(":checked")==false){
						$(this).parents("tr").remove();
					}
				})
				$(".commentSelectAll").prop("checked",true);
			}else{
				alert("操作失败");
			}
		}
	})
}
function batchHidden(commentId){
	$.ajax({
		type:"get",
		url:"http://139.199.11.183:8080/Seven_Two/details/hiddenComment.do",
		async:true,
		data:commentId,
		dataType:"json",
		success:function(data){
			console.log(data);
			if(data){
				$(".commentSelect:checked").parents("tr").remove();
				$(".commentSelectAll").prop("checked",false);
			}else{
				alert("操作失败");
			}
		}
	})
}
// ------------------------ 评论管理结束 ----------------------
// http://139.199.11.183:8080/Seven_Two/
$(".selectFloorsBtn").off("click").on("click",function(){
	$(".main_content_show div[sellerId='0']").css("display","block");
	requestSelectFloor();
	$(".main_content_show div[sellerId="+$(this).attr("SelBtnId")+"]").css("display","none");
	sellerId = 0;
})
function changeShow(){
	$(".menu_list ol .menu_list_h2 ul li").each(function(index){
		$(this).click(function(){
			$(".main_show_index").css("display","none");
			$(".main_content_show div[sellerId="+sellerId+"]").css("display","none");
			$(".main_content_show div[sellerId="+index+"]").css("display","block");
			$(".main_content_top h2 span").html($(this).find("a").html());
			switch(index){
				case 0:
					requestSelectFloor();
					break;
				case 1:
					exchangeFloor();
					update_floorMessage();
					break;
				case 2:
					requestSelectFloor();
					break;
				case 3:
					huifuFloor();
					break;
				case 4:
					requestGoods(goodsCounts,nowPage,categoryId,brandId,likeName);
					$(".goods_listShow").css("display","block");
					$(".update_goods").css("display","none");
					break;
				case 5:
					addGoodsClass1(".addGoodsClass_1");
					addGoodsBrand(".addGoodsBrands");
					changesSelect(".addGoodsClass_1",".addGoodsClass_2");
					changesSelect(".addGoodsClass_2",".addGoodsClass_3");
					break;
				case 6:
					break;
				case 7:
					break;
				case 8:
					requestDelGoods(delGoodsCounts,delNowPage);
					break;
				case 9:
					orederRequest(orderGoodsCounts,orderNowPage);
					break;
				case 10:
					selectOrderSeach("");
					break;
				case 11:
					break;
				case 12:
					break;
				case 13:
					break;
				case 14:
					break;
				case 15:
					commentManage();
					break;
			}
			sellerId = index;
		})
	})
}
