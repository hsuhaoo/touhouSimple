(function(){
	//创建敌人对象
	var Enemy=window.Enemy=function(x,y,type){
		this.x = x;
		this.y = y;
		this.dx=0;
		this.dy=0;
		this.width = 50;
		this.height = 50;
		this.step = 20;
		this.type = type;
		// if(this.type == "type3"){
			this.angle = 0;
		// }
		this.f = 0; 
		game.enemys.push(this);
	};
	//绘制图像
	Enemy.prototype.render = function(){
		game.ctx.drawImage(game.sprite,320,720,160,180,this.x-30,this.y-30,this.width,this.height);
		// if(this.type == "type1"){
		// 	game.ctx.drawImage(game.sprite,320,720,160,180,this.x-30,this.y-30,this.width,this.height);
		// }
		// if(this.type == "type2"){  
		// 	game.ctx.drawImage(game.sprite,636,900,160,180,this.x-30,this.y-30,this.width,this.height);
		// }	
		// if(this.type == "type3"){  
		// 	game.ctx.drawImage(game.sprite,480,900,160,180,this.x-30,this.y-30,this.width,this.height);
		// }
	};

	//根据Game.progress传入的敌人类型 选择对应的攻击子弹
	Enemy.prototype.update = function(){
		this.f++;
		if(this.type == "type1"){ //圆形散射
			if(game.f%20 == 0)
				for(var i=0; i<10; i++){ 
					new Bullet(this.x,this.y,i*2*Math.PI/10,"type1");//子弹开始的范围 
				}		
		}
 		if(this.type == "type2"){ //自狙击
 			if(game.f%20 == 0)
 					new Bullet(this.x,this.y,Math.atan2(game.player.y-this.y,game.player.x-this.x),"type1");
 		}
 		if(this.type == "type3"){ //弧形
 			if(game.f%5==0){
 				this.angle+=20;//控制子弹的间距
 				new Bullet(this.x, this.y,this.angle*Math.PI/180,"type1");
 			}		
 		}
		//敌人被player子弹击中
		// for(var i=game.playerBullets.length-1;i>=0;i--){
		// 	if(Math.abs(this.x-game.playerBullets[i].x)<(15+12)/2 &&
		// 		Math.abs(this.y-game.playerBullets[i].y+27.5)<(15+55)/2){
		// 			game.deleteEnemy(this);
		// 	}
		// }
		if(this.type == "type4"){ 
			// //形态一旋转弧形组
			// if(this.f >= 0 && this.f <= 800){
			// 	this.angle -= 0.1;
			// 	var dt = 10;//根据难度可以再修改 可以放定义里
			// 	for(var i=0;i<6.28;i+=1.26){ 
			// 		this.f%dt == 0 && this.f%(dt*2)!=0 &&
			// 		new Bullet(this.x,this.y,this.angle+i,"brect");
			// 		this.f%dt == 0 && this.f%(dt*2) ==0 && 
			// 		new Bullet(this.x,this.y,this.angle+i,"prect");
			// 		}
			// }

			// //形态二旋转花形
			// if(this.f == 850) this.angle =0;
			// if(this.f >= 900 && this.f <= 1700){
			// 	this.angle -= 0.005;
			// 	var dt  = 10;
			// 	for(var i=0;i<12.56;i+=2.52){ //和形态一一样 反向也搞了一个
			// 		this.f%dt == 0 && this.f%(dt*2)!=0 &&
			// 		new Bullet(this.x,this.y,this.angle+i,"brect");
			// 		this.f%dt == 0 && this.f%(dt*2)!=0 &&
			// 		new Bullet(this.x,this.y,-this.angle+i,"prect");
			// 	}	
			// }

			//形态三
			// if(this.f >= 1750 && this.f <= 2550){ 
			if(this.f >= 0 && this.f <= 800){
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
				if((this.f >=100 && this.f <=600)||(this.f >=2250 && this.f <=2550) ){
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
		}
	};
})();


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