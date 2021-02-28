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
		this.angle = 0;
		this.f = 0; 
		game.enemys.push(this);
		this.offsetx = [];
		this.offsety = [];
	};
	//绘制图像
	Enemy.prototype.render = function(){
		game.ctx.drawImage(game.sprite,0,540,160,180,this.x-15,this.y-30,this.width,this.height);
		// game.ctx.drawImage(game.sprite,320,720,160,180,this.x-30,this.y-30,this.width,this.height);
		// game.ctx.beginPath();
        // game.ctx.rect(this.x-7.5, this.y, 30, 30);
        // game.ctx.fillStyle = "#0095DD";
        // game.ctx.fill();
        // game.ctx.closePath();
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
		if(this.type == 1){ //圆形散射
			if(game.f%20 == 0)
			// new Bullet(this.x,this.y,0,"type1");//子弹开始的范围 
			for(var i=0; i<3; i++){ 
				new Bullet(this.x,this.y,(3+i)*Math.PI/8,"type1");//子弹开始的范围 
			}		
		}
		if(this.type == 2){ //圆形散射
			if(game.f%20 == 0)
				for(var i=0; i<10; i++){ 
					new Bullet(this.x,this.y,i*2*Math.PI/10,"type1");//子弹开始的范围 
				}		
		}

 		if(this.type == 3){ //自狙击
 			if(game.f%20 == 0)
 					new Bullet(this.x,this.y,Math.atan2(game.player.y-this.y,game.player.x-this.x),"type1");
 		}
 		if(this.type == 4){ //弧形
 			if(game.f%5==0){
 				this.angle+=20;//控制子弹的间距
 				new Bullet(this.x, this.y,this.angle*Math.PI/180,"type1");
 			}		
 		}

		if(this.type == 5){ 
			// //形态一旋转弧形组
			this.angle -= 0.1;
			var dt = 10;//根据难度可以再修改 可以放定义里
			for(var i=0;i<6.28;i+=1.26){ 
				this.f%dt == 0 && this.f%(dt*2)!=0 &&
				new Bullet(this.x,this.y,this.angle+i,"brect");
				this.f%dt == 0 && this.f%(dt*2) ==0 && 
				new Bullet(this.x,this.y,this.angle+i,"prect");
			}
		}

			// //形态二旋转花形
		if(this.type == 6){

			this.angle -= 0.005;
			var dt  = 10;
			for(var i=0;i<12.56;i+=2.52){ //和形态一一样 反向也搞了一个
				this.f%dt == 0 && this.f%(dt*2)!=0 &&
				new Bullet(this.x,this.y,this.angle+i,"brect");
				this.f%dt == 0 && this.f%(dt*2)!=0 &&
				new Bullet(this.x,this.y,-this.angle+i,"prect");
			}	
		}

		if(this.type == 7){ //密集型

			var offsetx = [];
			var offsety = [];
			if(game.f == 20)
				for(var i=0; i<10; i++){
						new Bullet(this.x,this.y,i*2*Math.PI/10,"type6");//子弹开始的范围 
				}
			if(game.f == 50){
				for(var i=0; i<game.enemyBullets.length;i++){
					offsetx.push(game.enemyBullets[i].x);
					offsety.push(game.enemyBullets[i].y);
			    }
				game.enemyBullets = [];
				for(var i=0; i<10; i++){
					for(var j=0; j<offsetx.length; j++) 
						new Bullet(offsetx[j],offsety[j],i*2*Math.PI/10,"type1");//子弹开始的范围 
				}
			}		
		}
		if(this.type == 8){ //距离改变密集型

			if(game.f == 20)
				for(var i=0; i<10; i++){
						new Bullet(this.x,this.y,i*2*Math.PI/10,"type6");//子弹开始的范围 
				}
			if(game.f == 50){
				for(var i=0; i<game.enemyBullets.length;i++){
					this.offsetx.push(game.enemyBullets[i].x);
					this.offsety.push(game.enemyBullets[i].y);
			    }
				game.enemyBullets = [];
			}
			if(game.f>50 && (game.f-50)%5 == 0){
				var j = (game.f-50)/5 % 8;
				for(var i=0; i<10; i++){
					new Bullet(this.offsetx[j],this.offsety[j],i*2*Math.PI/10,"type6");//子弹开始的范围 
				}
			}		
		}

	};
})();


