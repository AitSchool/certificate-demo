$(function(){
    let certificate = {
        data:{
            uname:"Jax",//姓名
            pic:"./images/avatar.png",//头像
            phone_status:0,      //手机是否认证
            gender:"保密",       //性别
            provice_id:0,       //省
            city_id:0,          //市
            career_status:0,    //职业状态,1-学生、2-在职、3-待业
            career_type:"",      //职业类型,学生:初中、高中、大学;在职:产品、前端、后端;
            work_experience:0,  //工作年限
            school_year_enter:0,//入学年份
            career_interest:"",  //职业方向＋水平 eg:114-121|115-125
            ca_status:0,         //是否认证
        },
        interestArr:[],          //临时存放用户选择职业方向数据
        // 工作年限制数据
        workExperienceData: [{
            id: 1,
            name: '1年以下'
        },{
            id: 2,
            name: '1-2年'
        },{
            id: 3,
            name: '3-5年'
        },{
            id: 4,
            name: '6-10年'
        },{
            id: 5,
            name: '10年以上'
        }],
        //存放职业方向接口的数据
        InterestData:[{
            item_id: 114,
            name: 'Web 前端工程师'
        },{
            item_id: 115,
            name: 'Python Web 工程师'
        },{
            item_id: 116,
            name: 'GO 语言工程师'
        },{
            item_id: 117,
            name: 'Java Web 工程师'
        },{
            item_id: 118,
            name: 'PHP 工程师'
        },{
            item_id: 119,
            name: 'Android 开发工程师'
        },{
            item_id: 120,
            name: 'iOS 开发工程师'
        }],
        tempPageOne:"",         //存放第一步页面
        tempPageTwo:"",         //存放第二步页面
        tempPageThree:"",       //存放第三步页面
        slugString:"",
        levelString:"",
        init:function(){
            this.bind();
        },
        bind:function(){
            $('body').on('click','.certificate',this.showTemple);
            //关闭浮窗
            $('body').on('click','.caPopup .caClose',this.close);
            // 刷新页面
            $('body').on('click','.caPopup .caStudyNow a',this.reload);
            // 打开下拉框
            $('body').on('click','.caPopup .caSexSelect button',{'arg':'Sex'},this.openSelect)
            $('body').on('click','.caPopup .caProSelect button',{'arg':'Pro'},this.openSelect)
            $('body').on('click','.caPopup .caCitySelect button',{'arg':'City'},this.openSelect)
            $('body').on('click','.caPopup .caSGYearSelect button',{'arg':'SGYear'},this.openSelect)
            $('body').on('click','.caPopup .caGradeSelect button',{'arg':'Grade'},this.openSelect)
            $('body').on('click','.caPopup .caJobSelect button',{'arg':'Job'},this.openSelect)
            $('body').on('click','.caPopup .caJobYearSelect button',{'arg':'JobYear'},this.openSelect)
            // 选择参数，关闭下拉框
            $('body').on('click','.caPopup .caCitySelect ul li',{'arg':'City'},this.getValue)
            $('body').on('click','.caPopup .caSexSelect ul li',{'arg':'Sex'},this.getValue)
            $('body').on('click','.caPopup .caProSelect ul li',{'arg':'Pro'},this.getValue)
            $('body').on('click','.caPopup .caSGYearSelect ul li',{'arg':'SGYear'},this.getValue)
            $('body').on('click','.caPopup .caGradeSelect ul li',{'arg':'Grade'},this.getValue)
            $('body').on('click','.caPopup .caJobSelect ul li',{'arg':'Job'},this.getValue)
            $('body').on('click','.caPopup .caJobYearSelect ul li',{'arg':'JobYear'},this.getValue)
            // 选择职业状态
            $('body').on('click','.caPopup .caStatusSelect li',this.getStatusValue)
            // 选择兴趣方向
            $('body').on('click','.caPopup .caInterestSelect li',this.getInterestValue)
            // 选择兴趣水平
            $('body').on('click','.caPopup .caLevelSelect li',this.getInterestLevel)
            $('body').on('mouseover','.caPopup .caLevelSelect li',this.interestLevelLineOver)
            $('body').on('mouseout','.caPopup .caLevelSelect li',this.interestLevelLineOut)
            //按钮下一步
            $('body').on('click','.caPopup .activeOne',this.activeOne)
            $('body').on('click','.caPopup .activeTwo',this.activeTwo)
            $('body').on('click','.caPopup .activeThree',this.activeThree)
            $('body').on('click','.caPopup .activeFour',this.activeFour)
            $('body').on('click','.caPopup .activeFive',this.activeFive)
            // // 验证表单
            $('body').on('click','.caPopup .getVerifyCode',this.getMobileCode);
            $('body').on('click','.caPopup .caformImg',this.upDataImgUrl);
            $('body').on('focus','.caPopup .caform input',this.clearError);
            $('body').on('click','.caPopup .activeSix',this.activeSix);
        },
        showTemple:function(){
            let html  = `
                <div class='caMask'>
                    <div class="caPopup">
                        <span class="caClose"></span>
                        <div class="caContainer" >
                            <div class="caContainerOne" >
                                <span class="caStep">第 <span class="caStepNum">1</span> 步</span>
                                <h2>成为认证学员<img src="./images/start1.png"></h2>
                                <p class="caInfo">成为极客学院认证学员，点亮专属身份标识，<span class="color333">免费观看</span> 全站 80% 以上会员课程。</p>
                                <div class="caPopup-container">
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            `
            $('body').append(html);
            certificate.templeteOneHtml();
        },
        templeteOneHtml:function(){
            let provinceLiHtml = certificate.proHtml();
            let SGYearLiHtml   = certificate.dateHtml();
            let workExperienceHtml = certificate.workExperienceHtml();
            let pic   = certificate.data.pic;
            let uname = certificate.data.uname;
            let provice_id = certificate.data.provice_id;
            let city_id = certificate.data.city_id;
            let gender  = certificate.data.gender || '性别';
            let provice = '省';
            let city = '市';
            if( provice_id ){
                let proviceData = data_area.child.filter( data => data.id == provice_id)[0];
                provice = proviceData.name;
                let cityData = proviceData.child.filter( data => data.id == city_id)[0]
                city = cityData.name
            }
            let career_status = certificate.data.career_status;
            let career_type = certificate.data.career_type;
            let school_year_enter = certificate.data.school_year_enter;
            let work_experience_id   = certificate.data.work_experience;
            let work_experience_name = '工作年限';
            if(work_experience_id){
                let work_experience_data = certificate.workExperienceData.filter( data => data.id == work_experience_id)[0]
                work_experience_name = work_experience_data.name;
            }

            let html  = `
                <section class="caStepOne">
                    <div class="caUser">
                        <img src="${pic}">
                        <span>${uname}</span>
                    </div>
                    <div class="caUserFromOne">
                        <div class="fromConOne">
                            <span>性别：</span>
                            <div class="caSelect caSexSelect">
                                <button>${gender}</button>
                                <ul>
                                    <li value="男">男</li>
                                    <li value="女">女</li>
                                    <li value="保密">保密</li>
                                </ul>
                            </div>
                            <span>现居住地：</span>
                            <div class="caSelect caProSelect">
                                <button>${provice}</button>
                                <ul>${provinceLiHtml}</ul>
                            </div>
                            <div class="caSelect caCitySelect">
                                <button>${city}</button>
                                <ul></ul>
                            </div>
                        </div>
                        <div class="fromConTwo">
                            <p>您的当前状态 :</p>
                            <ul class="caStatusSelect">
                                <li class="${career_status == 1 ? 'active' : ''}" value="1">学生</li>
                                <li class="${career_status == 2 ? 'active' : ''}" value="2">在职</li>
                                <li class="${career_status == 3 ? 'active' : ''}" value="3">待业</li>
                            </ul>
                        </div>
                        <div class="fromConThree">
                            <div class="caSelect caGradeSelect" style="display:${career_status == 1 ? 'block' : 'none'}">
                                <button>${career_status == 1 && career_type ? career_type : '你所在年级'}</button>
                                <ul>
                                    <li value="高中以下">高中以下</li>
                                    <li value="专科">专科</li>
                                    <li value="大学本科">大学本科</li>
                                    <li value="研究生及以上">研究生及以上</li>
                                </ul>
                            </div>
                            <div class="caSelect caSGYearSelect" style="display:${career_status == 1 ? 'block' : 'none'}">
                                <button>${school_year_enter || '入学年份'}</button>
                                <ul>${SGYearLiHtml}</ul>
                            </div>

                            <div class="caSelect caJobSelect" style="display:${career_status == 2 ? 'block' : 'none'}">
                                <button>${career_status == 2 && career_type ? career_type : '你所从事的职业'}</button>
                                <ul>
                                    <li value="技术">技术</li>
                                    <li value="产品">产品</li>
                                    <li value="设计">设计</li>
                                    <li value="测试">测试</li>
                                    <li value="运营">运营</li>
                                    <li value="其他">其他</li>
                                </ul>
                            </div>
                            <div class="caSelect caJobYearSelect" style="display:${career_status == 2 ? 'block' : 'none'}">
                                <button>${work_experience_name}</button>
                                <ul>${workExperienceHtml}</ul>
                            </div>
                        </div>
                    </div>
                    <div class="caBtnCon">
                        <button class="caSubBtn caSubOne">下一步</button>
                    </div>
                </section>
            `
            $('.caPopup-container').html(html);
            $('.caStepNum').text(1);
            certificate.showBtnOne();
        },
        templeteTwoHtml:function(){
            let interestArr = [];
            let career_interest_id = [];
            let career_interest = certificate.data.career_interest;
            if(career_interest){
                interestArr = career_interest.split('|');
                career_interest_id = interestArr.map( data => {
                    let id = data.split('-')[0];
                    id = Number(id);
                    return id
                })

            }
            certificate.interestArr = interestArr;
            let interestHtml = '';
            let InterestData = certificate.InterestData;

            InterestData.forEach(function(data,index){
                let id = data.item_id
                let name = data.name
                let html;

                if(career_interest_id.includes(id)){
                    html = `<li value="${id}" class="active">${name}</li>`
                }else{
                    html = `<li value="${id}">${name}</li>`
                }
                interestHtml += html
            })

            let templeteTwoHtml = `
            <section class="caStepTwo">
                <p class="caStepTwoTitle">选择你感兴趣的职业方向（最多可选择 3 项）<span>系统将根据您的选择为您推荐合适的课程</span></p>
                <ul class="caInterestSelect">
                    ${interestHtml}
                </ul>
                <div class="caBtnCon">
                    <button class="caSubBtn caSubTwo activeTwo">上一步</button>
                    <button class="caSubBtn caSubThree">下一步</button>
                </div>
            </section>
            `
            $('.caPopup-container').html(templeteTwoHtml)
            $('.caStepNum').text(2);
            certificate.showBtnThree();
        },
        templeteThreeHtml:function(){
            var interestLevelHtml = '';
            certificate.interestArr.forEach(function(data,index){
                var id = data.split("-")[0]

                certificate.InterestData.forEach(function(data,index){
                    if(id == data.item_id){
                        var text = data.name
                        var html = `
                            <li>
                                <span class="levelText">${text}</span>
                                <ul class="caLevelSelect">
                                    <li vkey="${id}" value="121">完全不了解</li>
                                    <li vkey="${id}" value="122">有点了解</li>
                                    <li vkey="${id}" value="123">熟悉</li>
                                    <li vkey="${id}" value="124">精通</li>
                                </ul>
                                <ul class="caLevelLine">
                                    <li></li>
                                    <li></li>
                                    <li></li>
                                    <li></li>
                                </ul>
                            </li>
                        `
                        interestLevelHtml += html
                    }
                })
            })

            var templeteThreeHtml = `
                <section class="caStepThree">
                    <p class="caStepThreeTitle">您在这些方向上当前的水平如何？<span>系统将根据您的选择为您推荐合适的课程</span></p>
                    <ul class="caLevelContainer">
                        ${interestLevelHtml}
                    </ul>
                    <div class="caBtnCon">
                        <button class="caSubBtn caSubFour activeFour">上一步</button>
                        <button class="caSubBtn caSubFive">申请认证</button>
                    </div>
                </section>
            `
            $('.caPopup-container').html(templeteThreeHtml);
            $('.caStepNum').text(3);
        },
        templeteFourHtml:function(){
            var pic = certificate.data.pic
            var name = certificate.data.uname
            var templeteFourHtml =`
                <div class="caContainerThree">
                    <div class="caPopup-container">
                        <section class="caStepFive">
                            <div class="caSuccessContainer">
                                <div class="userPic">
                                    <img class="userPhoto" src="${pic}">
                                    <img class="userPhotoIcon" src="./images/start2.png">
                                </div>
                                <p class="caScName">${name}</p>
                                <h4>恭喜，完成认证!</h4>
                                <p class="caCanSeetext">现在你可以免费观看 80% 以上会员课程</p>
                                <p class="caStudyNow"><a href="javascript:;">马上去学习 >></a></p>
                            </div>
                            <p class="recommendtitle">为您推荐如下课程</p>
                            <dl class="viplesson">
                                <dt>会员课程</dt>
                                <dl><a href="javascript:;" >推荐课程</a></dl>
                                <dl><a href="javascript:;" >推荐课程</a></dl>
                                <dl><a href="javascript:;" >推荐课程</a></dl>
                                <dl><a href="javascript:;" >推荐课程</a></dl>
                                <dl><a href="javascript:;" >推荐课程</a></dl>
                                <dl><a href="javascript:;" >推荐课程</a></dl>
                            </dl>
                        </section>
                    </div>
                </div>
            `

            $('.caContainer').html(templeteFourHtml)
        },
        templeteFiveHtml:function(){
            let getImgCodeUrl = 'https://huodong.jikexueyuan.com/jike1024/verifyCode';
            var imgCode = getImgCodeUrl+ '?' + new Date().getTime();
            var templeteFiveHtml = `
                <div class="caContainerTwo">
                    <h2><span>!</span>绑定手机 完成认证</h2>
                    <p class="caInfo">请您绑定手机防止账号丢失和被盗，手机号可用于登录和找回密码。</p>
                    <div class="caPopup-container">
                        <section class="caStepFour">
                            <div class="caform">
                                <input class="caformPhone" type="text" name="phone" placeholder="请输入手机号码">
                                <span class="phoneError"></span>
                            </div>
                            <div class="caform">
                                <input class="caformImgCode" type="text" name="verify" placeholder="验证码">
                                <span class="imgError"></span>
                                <img class="caformImg" src="${imgCode}" alt="图片验证码">
                            </div>
                            <div class="caform">
                                <input class="caformVerifyCode" type="text" name="verify_code" placeholder="动态码">
                                <span class="verError"></span>
                                <button class="getVerifyCode">获取动态码</button>
                            </div>
                            <div class="caBtnCon">
                                <button class="caSubBtn caSubSix">绑定手机</button>
                            </div>
                        </section>
                    </div>
                </div>
            `
            $('.caContainer').html(templeteFiveHtml)
        },
        openSelect:function(event){
            var arg = event.data.arg
            var ele = `.ca${arg}Select ul`
            $(ele).show();
        },
        getValue:function(event){
            var arg =event.data.arg
            var val = this.getAttribute('value')
            switch(arg){
                case 'Sex':
                    certificate.data.gender = val;
                    break
                case 'City':
                    certificate.data.city_id = val;
                    break
                case 'SGYear':
                    certificate.data.school_year_enter = val;
                    break
                case 'Grade':
                    certificate.data.career_type = val;
                    break
                case 'Job':
                    certificate.data.career_type = val;
                    break
                case 'JobYear':
                    certificate.data.work_experience = val;
                    break
                case 'Pro':
                    certificate.data.provice_id = val;
                    var proIndex = Number(val) - 2;
                    var cityLiHtml = '';

                    data_area.child[proIndex].child.forEach(function(data){
                        var text = data.name
                        var value = data.id
                        var html = `<li value="${value}">${text}</li>`
                        cityLiHtml += html
                    })

                    $('.caCitySelect button').html('市').removeClass('color333')
                    certificate.data.city_id = '';
                    $('.caCitySelect ul').show();
                    $('.caCitySelect ul li').remove();
                    $('.caCitySelect ul').append(cityLiHtml);

                    break;
            }
            $(`.ca${arg}Select button`).html($(this).text()).addClass('color333')
            $(`.ca${arg}Select ul`).hide();

            certificate.showBtnOne()
        },
        getStatusValue:function(){
            var val = this.getAttribute('value')
            certificate.data.career_status = val;
            $('.caStatusSelect li').removeClass('active')
            $(this).addClass('active')

            switch(val){
                case '1':
                    $('.caGradeSelect').show();
                    $('.caSGYearSelect').show();
                    $('.caJobSelect').hide();
                    $('.caJobYearSelect').hide();
                    certificate.data.career_type="";
                    certificate.data.work_experience="";
                    $('.caJobSelect button').html('你所从事的职业').removeClass('color333')
                    $('.caJobYearSelect button').html('工作年限').removeClass('color333')
                    break;
                case '2':
                    $('.caGradeSelect').hide();
                    $('.caSGYearSelect').hide();
                    $('.caJobSelect').show();
                    $('.caJobYearSelect').show();

                    certificate.data.career_type=""
                    certificate.data.school_year_enter=""
                    $('.caGradeSelect button').html('你所在年级').removeClass('color333')
                    $('.caSGYearSelect button').html('入学年份').removeClass('color333')
                    break;
                case '3':
                    $('.caGradeSelect').hide();
                    $('.caSGYearSelect').hide();
                    $('.caJobSelect').hide();
                    $('.caJobYearSelect').hide();
                    certificate.data.career_type=""
                    certificate.data.work_experience=""
                    certificate.data.school_year_enter=""
                    $('.caGradeSelect button').html('你所在年级').removeClass('color333')
                    $('.caSGYearSelect button').html('入学年份').removeClass('color333')
                    $('.caJobSelect button').html('你所从事的职业').removeClass('color333')
                    $('.caJobYearSelect button').html('工作年限').removeClass('color333')
                    break;
            }

            certificate.showBtnOne()

        },
        getInterestValue:function(){
            var val = this.getAttribute('value')
            var tindex = null;
            var text = $(this).text()
            var obj  = `${val}-0`
            var that = $(this)

            var flag= true
            certificate.interestArr.forEach(function(data,index){
                data = data.split("-")[0]
                if(data == val){
                    flag = false
                    tindex = index
                }
            })

            if(flag){
                var len = certificate.interestArr.length;
                if(len < 3){
                    $(this).addClass('active')
                    certificate.interestArr.push(obj);
                }
            }else{
                // 再次点击删除相同项目
                certificate.interestArr.splice(tindex,1);
                that.removeClass('active')
            }

            certificate.data.career_interest = certificate.interestArr.join('|');
            certificate.showBtnThree()
        },
        getInterestLevel:function(){

            var vid = this.getAttribute('vkey')
            var level = this.getAttribute('value')
            var obj = `${vid}-${level}`
            var tindex = null;
            var flag= true

            certificate.interestArr.forEach(function(data,index){
                data = data.split("-")[0]
                if(data == vid){
                    flag=false
                    tindex = index
                }
            })
            if(flag){
                $(this).parent().children().removeClass('active')
                $(this).addClass('active')
                certificate.interestArr.push(obj);
            }else{
                certificate.interestArr.splice(tindex,1);
                $(this).parent().children().removeClass('active')
                $(this).addClass('active')
                certificate.interestArr.push(obj);

            }

            var lineIndex = null;
            switch(level){
                case '121':
                lineIndex = 1;
                break;
                case '122':
                lineIndex = 2;
                break;
                case '123':
                lineIndex = 3;
                break;
                case '124':
                lineIndex = 4;
                break;
            }

            // // 提示下划线高亮
            var bottomLine = $(this).parent().next()
            bottomLine.children().removeClass('active')
            var bottomLineIndexElement = `li :lt(${lineIndex})`
            bottomLine.children(bottomLineIndexElement).addClass('active')

            certificate.showBtnFive();
        },
        interestLevelLineOver:function(){

            var level = this.getAttribute('value')

            var lineIndex = null;
            switch(level){
                case '121':
                lineIndex = 1;
                break;
                case '122':
                lineIndex = 2;
                break;
                case '123':
                lineIndex = 3;
                break;
                case '124':
                lineIndex = 4;
                break;
            }

            var bottomLine = $(this).parent().next()
            bottomLine.children().removeClass('active')
            var bottomLineIndexElement = `li :lt(${lineIndex})`
            bottomLine.children(bottomLineIndexElement).addClass('active')
        },
        interestLevelLineOut:function(){
            var vid = this.getAttribute('vkey')
            var level = ''

            certificate.interestArr.forEach(function(data,index){
                data = data.split("-")
                if(data[0] == vid){
                    level = data[1]
                }
            })

            var lineIndex = null;
            switch(level){
                case '121':
                lineIndex = 1;
                break;
                case '122':
                lineIndex = 2;
                break;
                case '123':
                lineIndex = 3;
                break;
                case '124':
                lineIndex = 4;
                break;
            }

            var bottomLine = $(this).parent().next()
            bottomLine.children().removeClass('active')
            var bottomLineIndexElement = `li :lt(${lineIndex})`
            bottomLine.children(bottomLineIndexElement).addClass('active')
        },
        proHtml:function(){
            var provinceLiHtml = '';
            data_area.child.forEach(function(data){
                var text = data.name
                var value = data.id
                var html = `<li value="${value}">${text}</li>`
                provinceLiHtml += html
            })
            return provinceLiHtml;
        },
        dateHtml:function(){
            var SGYearLiHtml='';
            for (var i = 2016; i >= 1976; i--) {
                var value = i
                var html = `<li value="${value}">${value}</li>`
                SGYearLiHtml += html
            }
            return SGYearLiHtml;
        },
        workExperienceHtml:function(){
            let workExperienceHtml = '';
            certificate.workExperienceData.forEach(function(data){
                let id = data.id;
                let name = data.name;
                let html = `<li value="${id}">${name}</li>`
                workExperienceHtml += html
            })
            return workExperienceHtml;
        },
        getMobileCode:function(){
            var tel = $.trim($(".caformPhone").val());
            var img = $.trim($('.caformImgCode').val());
            if(tel == ''){
                $('.phoneError').text('请输入您的手机号');
            }
            else if(certificate.isMobile(tel) == false){
                $('.phoneError').text('请输入正确的手机号');
            }
            else if(img == ''){
                $('.imgError').text('请输入验证码');
            }
            else{
                $('.caPopup').off('click','.getVerifyCode',this.getMobileCode)
                certificate.countDown();
                $('.caSubSix').addClass('activeSix');
            }
        },
        isMobile:function(tel){
            return /^((\(\d{2,3}\))|(\d{3}\-))?(1[34578]\d{9})$/.test(tel);
        },
        countDown:function(){
            $('.getVerifyCode').html(59+'秒后重试')
            var t = 59;
            var countDown = setInterval(function(){
                t --;
                $('.getVerifyCode').html(t+'秒后重试')

                if(t ==0){
                    clearInterval(countDown)
                    $('.getVerifyCode').html('获取动态码')
                    $('.caPopup').on('click','.getVerifyCode',certificate.getMobileCode)
                }
            },1000)
        },
        clearError:function(){
            $(this).next('span').text('');
        },
        upDataImgUrl:function(){
            var timenow = new Date().getTime();
            $('.caformImg').attr("src", getImgCodeUrl + '?' + timenow);
        },
        showBtnOne:function(){
            var val = certificate.data.career_status
            if(val == '3'){
                $('.caSubOne').addClass('activeOne')
            }else if(val == '2'){
                if(certificate.data.career_type && certificate.data.work_experience){
                    $('.caSubOne').addClass('activeOne')
                }else{
                    $('.caSubOne').removeClass('activeOne')
                }
            }else if(val == '1'){
                if(certificate.data.career_type && certificate.data.school_year_enter){
                    $('.caSubOne').addClass('activeOne')
                }else{
                    $('.caSubOne').removeClass('activeOne')
                }
            }
        },
        showBtnThree:function(){
            if(certificate.interestArr.length!==0){
                $('.caSubThree').addClass('activeThree')
            }else{
                $('.caSubThree').removeClass('activeThree')
            }
        },
        showBtnFive:function(){
            var flag = true;
            certificate.interestArr.forEach(function(data){
                data = data.split('-')[1]
                if(data == 0){
                    flag = false;
                }

            })
            if(flag){
                $('.caSubFive').addClass('activeFive')
            }
        },
        //下一步
        activeOne:function(){
            certificate.templeteTwoHtml()
        },
        // 上一步
        activeTwo:function(){
            certificate.templeteOneHtml();
        },
        activeThree:function(){
            certificate.templeteThreeHtml()
        },
        activeFour:function(){
            certificate.templeteTwoHtml()
        },
        //申请认证
        activeFive:function(){
            if(certificate.data.phone_status == 1){
                certificate.templeteFourHtml();
            }else{
                certificate.templeteFiveHtml();
            }
        },
        // 绑定手机
        activeSix:function(){
            var tel = $.trim($(".caformPhone").val());
            var code = $.trim($('.caformVerifyCode').val());
            if(tel == ''){
                $('.phoneError').text('请输入您的手机号');
            }
            else if(certificate.isMobile(tel) == false){
                $('.phoneError').text('请输入正确的手机号');
            }
            else if(code == ''){
                $('.verError').text('请输入验证码');
            }
            else{
                console.log('ook')
                certificate.templeteFourHtml();
            }
        },
        close:function(){
            $('.caMask').remove();
        },
        reload:function(){
            location.reload();
        },
    }

    certificate.init();
})