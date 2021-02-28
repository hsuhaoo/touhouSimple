(function(){
	//定义子弹类型
	var bullets = {
		"type1":{
			"step":5
		},
		"type2":{
			"step":5
		},
		"type3":{
			"step":2
		},
		"type6":{
			"step":5
		},
		"brect":{
			"color":1,
			"step":2,
			"rotateangle":0,
			"dangle":0.05
		},
		"prect":{
			"color":1,
			"step":2,
			"rotateangle":0,
			"dangle":-0.05
		},
		"light":{
			"step":0
		},
		"player":{
			"step":20
		}
	};
	//定义子弹对象
	var Bullet=window.Bullet=function(x,y,angle,type){
		this.x = x;
		this.y = y;
		this.width = 30;
		this.height = 30;
		this.type = type;
		this.step=bullets[this.type].step; //子弹速度20player 5enemy 
		this.angle = angle;		

		if(this.type == "brect" || this.type == "prect"){
			this.rotateangle=bullets[this.type].rotateangle;
			this.dangle=bullets[this.type].dangle; 
		}

		if(this.type == "light"){
			this.rx = 5;
			this.ry = 5;
			this.r = 5;
			this.dj = -0.01;
			this.startangle=this.angle;
		}
		//将子弹压入对应的数组
		if(this.type=="player"){
			game.playerBullets.push(this);
		}
		else{
			game.enemyBullets.push(this);
		}
	};
	//绘制子弹的图像
	Bullet.prototype.render = function(){	 
		if(this.type=="player"){
			game.ctx.save();
			game.ctx.translate(this.x+5,this.y+5);
			game.ctx.fillStyle = "yellow";
			game.ctx.fillRect(0,0,5,5);
			game.ctx.restore();
		}
		else if(this.type == "light"){
			game.ctx.save(); 
			game.ctx.translate(this.x,this.y);
			game.ctx.rotate(this.angle + Math.PI/2);
			game.ctx.drawImage(game.sprite,1280,900,138,16,10,10,10,200);
			game.ctx.restore();
		}
		else{
			if(this.type == "brect" || this.type == "prect"){
				game.ctx.rotate(this.rotateangle);	
			}
			game.ctx.save();
			game.ctx.translate(this.x,this.y);
			game.ctx.fillStyle = "yellow";
			game.ctx.fillRect(0,0,15,15);
		
			game.ctx.restore();
		}
	};
	//子弹的形状 
	Bullet.prototype.update=function(){
		this.x += this.step*Math.cos(this.angle);
		this.y += this.step*Math.sin(this.angle);

		if(this.x<-15||this.x>game.iCanvasWidth-15||this.y<-15||this.y>game.iCanvasHeight-15){
					game.deleteEnemyBullet(this);
		}
	};
})();