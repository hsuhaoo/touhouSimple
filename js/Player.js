(function(){
	//创建角色对象
	var Player=window.Player=function(){
		this.x = 208;
		this.y = 350;
		this.width = 20;
		this.height = 20;
		this.step = 8;
		this.life = 5;
		this.pointr = 5;
		this.ctx = window.ctx;
	};
	//绘制图像
	Player.prototype.render = function(){
		this.ctx.drawImage(game.sprite,664,584,136,136,this.x,this.y,this.width,this.height);
		// ctx.beginPath();
        // ctx.arc(this.x,this.y, 10, 0, Math.PI*2);
        // ctx.fillStyle = "#0095DD";
        // ctx.fill();
        // ctx.closePath();
		game.controlZ == 1 && new Bullet(this.x, this.y-10, -Math.PI/2,"player");
	};
	//键盘事件——左
	Player.prototype.goLeft=function(){
		this.x -= this.step; //x不断左移
		if(this.x < this.width/2){ //控制向左移动范围 缺点在左边子弹发射口不断左移会消失 应加上子弹口的width
			this.x = this.width/2;
		}
	};
	//键盘事件——右
	Player.prototype.goRight = function(){
		this.x += this.step; //x不断右移
		if(this.x > 388-this.width*1.5){ 
			this.x = 388-this.width*1.5;
		}
	};
	//键盘事件——上
	Player.prototype.goUp=function(){
		this.y -= this.step; //y不断上移
		if(this.y < this.height/2){ //控制向上移动范围 y以player的中心为起点 canvas2的y为0
			this.y = this.height/2;
		}
	};
	//键盘事件——下
	Player.prototype.goDown=function(){
		this.y += this.step; //y不断下移
		if(this.y > 438-this.height*1.5){ 
			this.y = 438-this.height*1.5;
		}
	};
	//角色被子弹击中
	Player.prototype.miss=function(){
		this.life--;
		game.updatePane();
	};
	//角色被子弹击中后 根据生命值重新开始
	Player.prototype.reStart=function(){
		if(this.life >= 0){
			this.x =208;//初始位置
			this.y = 350;
			game.enemyBullets=[];
		}
		else{
			game.state="开始界面";
			game.reset();
			game.player.reset();
			game.updatePane();
		}
	};
	//重置
	Player.prototype.reset=function(){
		this.x = 208;
		this.y = 350;
		this.width = 20;
		this.height = 20;
		this.step = 8;
		this.life = 5;
		this.pointr = 5;
	}; 
	Player.prototype.updatePane = function(){
		this.ctx.drawImage(this.sprite,408,0,613,438,408,0,613,438);
		this.ctx.font = "23px Arial";
		this.ctx.fillStyle = "black";
		this.ctx.strokeRect(408,0,613,438);//外边框
		this.ctx.strokeRect(426,18,169,201);//生命值边框
		this.ctx.fillText("LIFE",440,50);
		
		for(var i = 0; i < this.player.life; i++){
			this.ctx.drawImage(this.sprite,636,720,160,180,430+i*30,55,45,45);
		}

		this.ctx.fillText("东方Underground",420,340);
		this.ctx.font = "18px Arial";
		this.ctx.fillText("操作说明：",440,120);
		this.ctx.fillText("←↑→↓  移动",440,150);
		this.ctx.fillText("Z  射击",440,180);
		this.ctx.fillText("Enter  进入",440,210);
		
	
	};	
})();