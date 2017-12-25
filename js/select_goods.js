var getStart = location.href.indexOf("goodsId=");
var goods_id = location.href.substr(getStart+8)
$.ajax({
	type:"get",
	url:"http://139.199.11.183:8080/Seven_Two/goodsManage/selectGoodsById.do",
	async:true,
	data:{goodsId: goods_id},
	dataType:'json',
	success:function(data){
		console.log(data);
		// $(".lookGoods_left img").attr("src",data.goods.url);
		var lookGoods_html=`<div class="lookGoods_left">
								<img src="${data.goods.url}" width="350">
							</div>
							<div class="lookGoods_right">
								<h2>${data.goods.gName}</h2>
								<ul>
									<li>
										<span>商品货号：</span>
										<strong>${data.goods.categoryId}</strong>
									</li>
									<li>
										<span>商品分类：</span>
										<strong>${data.categoryName}</strong>
									</li>
									<li>
										<span>商品品牌：</span>
										<strong>${data.brandName}</strong>
									</li>
									<li>
										<span>市场价格：</span>
										<strong class="marketPrice">￥${data.goods.gMaketPrice}元</strong>
									</li>
									<li>
										<span>商品库存：</span>
										<strong>${data.goods.gStock}</strong>
									</li>
									<li>
										<span>商品积分：</span>
										<strong>${data.goods.gJiFen}</strong>
									</li>
									<li style="margin-top: 20px">
										<span>本店售价：</span>
										<strong class="nowPrice">￥${data.goods.price}元</strong>
									</li>
								</ul>
							</div>`;
		$(".lookGoods").html(lookGoods_html);
	}
})