(function(){
	//定义对象	
	var Boss=window.Boss=function(x,y,type){
		this.x = x;
		this.y = y;
		this.f = 0;
		this.angle = 0;
		this.width = 100;
		this.height = 100;
		this.step = 20;
		this.type = type;
		game.player.step = 2;	
	};
	//绘制图像
	Boss.prototype.render=function(){
		game.ctx.drawImage(game.sprite,0,540,160,180,this.x-50,this.y-50,this.width,this.height);
	};
	//生成BOSS的三种形态
	Boss.prototype.update=function(){
		this.f++;
	 //形态一旋转弧形组
		if(this.f >= 0 && this.f <= 800){
			this.angle -= 0.1;
			var dt = 10;//根据难度可以再修改 可以放定义里
			for(var i=0;i<6.28;i+=1.26){ 
				this.f%dt == 0 && this.f%(dt*2)!=0 &&
				new Bullet(this.x,this.y,this.angle+i,"brect");
				this.f%dt == 0 && this.f%(dt*2) ==0 && 
				new Bullet(this.x,this.y,this.angle+i,"prect");
				}
		}

	//形态二旋转花形
		if(this.f == 850) this.angle =0;
		if(this.f >= 900 && this.f <= 1700){
			this.angle -= 0.005;
			var dt  = 10;
		 	for(var i=0;i<12.56;i+=2.52){ //和形态一一样 反向也搞了一个
				this.f%dt == 0 && this.f%(dt*2)!=0 &&
				new Bullet(this.x,this.y,this.angle+i,"brect");
				this.f%dt == 0 && this.f%(dt*2)!=0 &&
				new Bullet(this.x,this.y,-this.angle+i,"prect");
			}	
		}

	//形态三
		if(this.f >= 1750 && this.f <= 2550){ 
			var dt = 10;
			//花形状 可以延长形态二的时间 形态三加个激光就行了 少写一些代码
			this.angle -= 0.005;var dt  = 10;
		 	for(var i=0;i<6.28;i+=1.26){ 	//和形态一一样 反向也搞了一个
				this.f%dt == 0 && this.f%(dt*2)!=0 &&
				new Bullet(this.x,this.y,this.angle+i,"brect");
				this.f%dt == 0 && this.f%(dt*2)!=0 &&
				new Bullet(this.x,this.y,-this.angle+i,"brect");
			}
			//激光
			if((this.f >=1800 && this.f <=2100)||(this.f >=2250 && this.f <=2550) ){
				if(this.f%100==0 && this.f%200!=0){
						var lightangle = 45;//避免画到右侧数据面板
						for(var i=0;i<6.28;i+=1.26){
							new Bullet(this.x+10*Math.cos(lightangle+i),
								this.y+10*Math.sin(lightangle+i),
								lightangle+0.5+i,"light");	
						}
				}
			}
		}

		if(this.f == 2900) game.state = "结束";
		
	

	};
})();