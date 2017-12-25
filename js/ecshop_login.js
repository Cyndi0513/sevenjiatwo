blur($(".ecshop_username"),"手机号/用户名/邮箱");
blur($(".ecshop_password"),"密码");
focus($(".ecshop_username"),"");
focus($(".ecshop_password"),"");
function blur(obj,str){
	$(obj).blur(function(){
		this.placeholder=str;
	})
}
function focus(obj,str){
	$(obj).focus(function(){
		this.placeholder=str;
	})
}
function confirm_1(){
	if($(".ecshop_username").val()!="" && $(".ecshop_password").val()!=""){
		var strS = "mName="+$(".ecshop_username").val()+"&mPassword="+$(".ecshop_password").val();
		$.ajax({
			type:"get",
			url:"http://139.199.11.183:8080/Seven_Two/managers/loginManager.do",
			data:strS,
			success:function(data){
				if(data=="true"){
					window.location.href="http://139.199.11.183:8080/Seven_Two/resource/views/sevenAddtwo/html/ecshop.html";
				}else{
					mizhu.alert('','密码或用户名错误！');
				}
			}
		})
	}
}
