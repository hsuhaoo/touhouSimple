(function(){
	var Game=window.Game=function(){
	//1. 公共变量声明块...........................................................
		this.canvas =  window.canvas;
		this.ctx = window.ctx;
		this.iCanvasWidth = 408;
		this.iCanvasHeight = 438;
		this.player = new Player();
		this.state = "开始界面";
		this.f = 0,
		this.level = 1,
		this.life = 5;
		this.offset = 0;
		this.start(); //游戏开始
		this.playerBullets=[],
		this.bossstate = false; 
		this.enemys=[],
		this.enemyBullets=[];
		this.boss=null;
		this.controlL=0; //键盘事件默认false 0
		this.controlR=0;
		this.controlU=0;
		this.controlD=0;
		this.controlZ=0;
		
	};

	//2. 函数定义块...........................................................
	Game.prototype.run = function(){
		var self = this;
		this.updatePane();
		this.bindEvent();
		this.timer=requestAnimationFrame(this.mainLoop.bind(this));
	};
	//右侧生命值数据更新
	Game.prototype.updatePane = function(){
		this.ctx.drawImage(this.sprite,408,0,613,438,408,0,613,438);
		this.ctx.font = "23px Arial";
		this.ctx.fillStyle = "black";
		this.ctx.strokeRect(408,0,613,438);//外边框

		this.ctx.fillText("弹幕算法demo",420,340);
		this.ctx.font = "18px Arial";
		this.ctx.fillText("操作说明：",440,100);
		this.ctx.fillText("←↑→↓  移动",440,150);
		this.ctx.fillText("Z  射击",440,180);
		this.ctx.fillText("Enter  进入",440,210);
		
	
	};	
	//绘制场景的背景
	Game.prototype.drawStage = function(){
		if(this.state == "开始界面"){
			// game.ctx.fillStyle = "white";
			this.ctx.drawImage(this.sprite,0,0,613,438,0,0,613,438);
			this.updatePane();
			this.ctx.fillStyle = this.level==1?"yellow":"black";
			this.ctx.fillText("散弹",184,59);
			this.ctx.fillStyle = this.level==2?"yellow":"black";
			this.ctx.fillText("圆形散射",184,109);
			this.ctx.fillStyle = this.level==3?"yellow":"black";
			this.ctx.fillText("自机狙",184,159);
			this.ctx.fillStyle = this.level==4?"yellow":"black";
			this.ctx.fillText("弧形",184,209);
			this.ctx.fillStyle = this.level==5?"yellow":"black";
			this.ctx.fillText("旋转弧形",184,259);
			this.ctx.fillStyle = this.level==6?"yellow":"black";
			this.ctx.fillText("旋转花形",184,309);
			this.ctx.fillStyle = this.level==7?"yellow":"black";
			this.ctx.fillText("密集型",184,359);
			this.ctx.fillStyle = this.level==8?"yellow":"black";
			this.ctx.fillText("距离改变密集型",184,409);
		}
		else if(this.state == "游戏中"){
			this.offset = this.offset < this.iCanvasHeight ? this.offset+2 : 0 ;
			this.ctx.drawImage(this.sprite,636,0,613,416,0,this.offset,this.iCanvasWidth,this.iCanvasHeight);//游戏界面
			this.ctx.drawImage(this.sprite,636,0,613,416,0,this.offset-this.iCanvasHeight,this.iCanvasWidth,this.iCanvasHeight);//游戏界面
		}	
		else if(this.state == "结束"){
			this.reset(); //重新开始 但是没有显示分数什么的
		}
	};
	//键盘事件
	Game.prototype.bindEvent=function(){
		document.onkeydown=function(event){
			if(this.state == "开始界面"){
				if(event.keyCode == 38){ //上方向键
					this.level -= 1; //默认难度为1
					if(this.level < 1){
						this.level = 8; 
					}
				}
				else if(event.keyCode == 40){//下方向键
						this.level += 1; 
						if(this.level > 8){
							this.level = 1;
						}
					}
				else if(event.keyCode == 13){ //enter键
						this.state="游戏中";
						this.progress();//生成敌人
					}
			}
			else if(this.state == "游戏中"){
					if(event.keyCode == 37){ //左方向键
						this.controlL=1;
					}
					if(event.keyCode==38){ //上方向键
						this.controlU=1;
					}
					if(event.keyCode==39){ //右箭头
						this.controlR=1;
					}
					if(event.keyCode==40){ //下箭头
						this.controlD=1;
					}
					if(event.keyCode==90){ //z 射击左右两个分散子弹
						this.controlZ=1;
					}
					if(event.keyCode==27){
						this.state = "结束";
					}
			}
		}.bind(this);
		document.onkeyup=function(event){
				if(this.state=="游戏中"){
					if(event.keyCode == 37){ //左
						this.controlL=0;
					}
					if(event.keyCode==38){ //上
						this.controlU=0;
					}
					if(event.keyCode==39){ //右
						this.controlR=0;
					}
					if(event.keyCode==40){ //下
						this.controlD=0;
					}
					
					if(event.keyCode==90){ //z
						this.controlZ=0;
					}
				}
			}.bind(this);
	};
	//主函数
	Game.prototype.mainLoop=function(){
		this.timer=requestAnimationFrame(this.mainLoop.bind(this));
		if(this.state == "开始界面") 
			this.drawStage();//场景一选关背景
		else{

			this.drawStage();//场景二敌人背景
			this.f++;//控制敌人出现时间

			this.controlL && this.player.goLeft(); //按下左方向键时左移
			this.controlR && this.player.goRight();
			this.controlU && this.player.goUp();
			this.controlD && this.player.goDown();

			this.player.render();//生成角色


		 	for(var i=0;i<this.enemyBullets.length;i++){
					this.enemyBullets[i].update();
					this.enemyBullets[i] && this.enemyBullets[i].render();
			}

			for(var i=0;i<this.enemys.length;i++){
					this.enemys[i].update();
					this.enemys[i] && game.enemys[i].render();
			}

		}
	};
	//生成敌人函数
	Game.prototype.progress=function(){
		//敌人1
		var enemy1 = new Enemy(game.iCanvasWidth/2-30, 100, this.level);
			
	};

	//清除敌人子弹
	Game.prototype.deleteEnemyBullet=function(o){
		for(var i=this.enemyBullets.length;i>=0;i--){
			 if(this.enemyBullets[i]===o){
				this.enemyBullets.splice(i,1)
			 }
		}
	};

	//游戏重置
	Game.prototype.reset=function(){
		this.iCanvasWidth = 408;
		this.iCanvasHeight = 438;
		this.state = "开始界面";
		this.f = 0,
		this.level = 1,
		this.life = 5;
		this.boss=null;
		this.bossstate = false; 
		this.playerBullets=[],
		this.enemys=[],
		this.enemyBullets=[];

		this.controlL=0; //键盘事件默认false 0
		this.controlR=0;
		this.controlU=0;
		this.controlD=0;
		this.controlZ=0;
		
	};
//3. 事件注册块...........................................................



//4. 初始化块............................................................
Game.prototype.start = function(){
	this.sprite = new Image();
	this.sprite.src = "images/sprite.png";

	this.sprite.onload = function(e){ 
		game.run();//游戏运行
	}
}

})();