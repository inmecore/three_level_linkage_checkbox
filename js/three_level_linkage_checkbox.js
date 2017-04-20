(function () {
    "use strict";
    // console.log(schoolid);
    //Global define
    if (typeof App != "object") {
        window.App = {};
    }
    App.ThreeLevelLinkageCheckbox = {};
    App.BaseUrl = "/";
}());

(function () {
    "use strict";
    /***************************************************************************
     * 说明：
     * 数据对应关系--f[i],s[i][j],t[i][j][k]
     * status有三种状态，checked | unchecked | half_checked
     * 数据示例:
     * first_data:
     * [
     *      {"_id":"1001","name":"教育","status":"unchecked"},
     *  ];
     *  second_data:
     *  [
     *      [
     *          {"_id":"2001","name":"教材","status":"unchecked"}
     *      ],
     *      [
     *          {"_id":"2001","name":"教材","status":"unchecked"}
     *      ],
     * ];
     * third_data:
     * [
     *   [
     *      [
     *          {"_id":"3001","name":"研究生/本科","status":"unchecked"},
     *          {"_id":"3002","name":"高职高专","status":"unchecked"},
     *          {"_id":"3003","name":"中职中专","status":"unchecked"}
     *      ],
     *      [
     *          {"_id":"3011","name":"英语综合教程","status":"unchecked"},
     *          {"_id":"3012","name":"英语专项训练","status":"unchecked"},
     *          {"_id":"3013","name":"英语读物","status":"unchecked"}
     *      ]
     *   ],
     * ]
     ***************************************************************************/
    App.ThreeLevelLinkageCheckbox = {
        "first_data":[],
        "second_data":[],
        "third_data":[],
        "expressFirst":"",
        "expressSecond":"",
        "expressThird":"",
        "arrow" : " <font>&gt;</font> ",
        "sort_container":"#sort_container",
        "sort1_id":"#sort1",
        "sort2_id":"#sort2",
        "sort3_id":"#sort3",
        init:function (first_data,second_data,third_data,id1,id2,id3) {
            /**
             * 初始化数据
             */
            if(id1){
                App.ThreeLevelLinkageCheckbox.sort1_id = id1;
            }else{
                App.ThreeLevelLinkageCheckbox.sort1_id = "#sort1";
            }
            if(id2){
                App.ThreeLevelLinkageCheckbox.sort2_id = id2;
            }else{
                App.ThreeLevelLinkageCheckbox.sort2_id = "#sort2";
            }
            if(id3){
                App.ThreeLevelLinkageCheckbox.sort3_id = id3;
            }else{
                App.ThreeLevelLinkageCheckbox.sort3_id = "#sort3";
            }

            App.ThreeLevelLinkageCheckbox.first_data = first_data;
            App.ThreeLevelLinkageCheckbox.second_data = second_data;
            App.ThreeLevelLinkageCheckbox.third_data = third_data;
            App.ThreeLevelLinkageCheckbox.InitFirstCheckbox();
        },
        InitSortId:function (container,id1,id2,id3) {
            App.ThreeLevelLinkageCheckbox.sort_container = container;
            App.ThreeLevelLinkageCheckbox.sort1_id = id1;
            App.ThreeLevelLinkageCheckbox.sort2_id = id2;
            App.ThreeLevelLinkageCheckbox.sort3_id = id3;
        },
        InitFirstCheckbox:function () {
            /**
             * 初始化第一级标签
             * 每个<li>标签绑定一个点击事件，以便初始化下级标签
             * 每个<checkbox>标签绑定一个点击事件,以便修改数据状态
             */
            var first_data_len = App.ThreeLevelLinkageCheckbox.first_data.length;
            var firstCont = "";
            for (var i=0; i<first_data_len; i++) {
                if(App.ThreeLevelLinkageCheckbox.first_data[i].status === "checked"){
                    firstCont += '<li onClick="App.ThreeLevelLinkageCheckbox.InitSecondCheckbox(' + i + ');">'+
                        '<a href="javascript:void(0)">'+
                        '<input type="checkbox" id="checkbox-1-'+i+ '\" class="regular-checkbox" checked="checked"  onclick="App.ThreeLevelLinkageCheckbox.FirstCheckboxClick('+i+')"/>'+
                        '<label for="checkbox-1-'+i+'\"></label>'+
                        '<span>'+App.ThreeLevelLinkageCheckbox.first_data[i].name + '</span>' +
                        '</a>' +
                        '</li>';
                }else if(App.ThreeLevelLinkageCheckbox.first_data[i].status === "half_checked"){
                    firstCont += '<li onClick="App.ThreeLevelLinkageCheckbox.InitSecondCheckbox(' + i + ');">'+
                        '<a href="javascript:void(0)">'+
                        '<input type="checkbox" id="checkbox-1-'+i+ '\" class="regular-checkbox"  onclick="App.ThreeLevelLinkageCheckbox.FirstCheckboxClick('+i+')"/>'+
                        '<label for="checkbox-1-'+i+'\"  style="background-color: #bcd3d3"></label>'+
                        '<span>'+App.ThreeLevelLinkageCheckbox.first_data[i].name + '</span>' +
                        '</a>' +
                        '</li>';
                }else{
                    firstCont += '<li onClick="App.ThreeLevelLinkageCheckbox.InitSecondCheckbox(' + i + ');">'+
                        '<a href="javascript:void(0)">'+
                        '<input type="checkbox" id="checkbox-1-'+i+ '\" class="regular-checkbox" onclick="App.ThreeLevelLinkageCheckbox.FirstCheckboxClick('+i+')"/>'+
                        '<label for="checkbox-1-'+i+'\"></label>'+
                        '<span>'+App.ThreeLevelLinkageCheckbox.first_data[i].name + '</span>' +
                        '</a>' +
                        '</li>';
                }


            }
            $(App.ThreeLevelLinkageCheckbox.sort1_id).html(firstCont);
            $(App.ThreeLevelLinkageCheckbox.sort1_id+" label").click(function(event){
                event.stopPropagation();
            });
        },
        InitSecondCheckbox:function (i) {
            /**
             *  初始化二级标签
             */
            var second_data_i_len = App.ThreeLevelLinkageCheckbox.second_data[i].length;
            var secondCont = "";
            for (var j=0; j<second_data_i_len; j++) {
                if(App.ThreeLevelLinkageCheckbox.second_data[i][j].status === "checked"){
                    secondCont += '<li onClick="App.ThreeLevelLinkageCheckbox.InitThirdCheckbox(' + i + ',' + j + ');">' +
                        '<a href="javascript:void(0)">'+
                        '<input type="checkbox" id="checkbox-2-'+j+ '\" class="regular-checkbox" checked="checked"  onclick="App.ThreeLevelLinkageCheckbox.SecondCheckboxClick('+i+','+j+')"/>' +
                        '<label for="checkbox-2-'+j+'\"></label>'+
                        '<span>'+App.ThreeLevelLinkageCheckbox.second_data[i][j].name + '</span>' +
                        '</a>' +
                        '</li>';
                }else if(App.ThreeLevelLinkageCheckbox.second_data[i][j].status === "half_checked"){
                    secondCont += '<li onClick="App.ThreeLevelLinkageCheckbox.InitThirdCheckbox(' + i + ',' + j + ');">' +
                        '<a href="javascript:void(0)">'+
                        '<input type="checkbox" id="checkbox-2-'+j+ '\" class="regular-checkbox"  onclick="App.ThreeLevelLinkageCheckbox.SecondCheckboxClick('+i+','+j+')"/>' +
                        '<label for="checkbox-2-'+j+'\" style="background-color: #bcd3d3"></label>'+
                        '<span>'+App.ThreeLevelLinkageCheckbox.second_data[i][j].name + '</span>' +
                        '</a>' +
                        '</li>';
                }else{
                    secondCont += '<li onClick="App.ThreeLevelLinkageCheckbox.InitThirdCheckbox(' + i + ',' + j + ');">' +
                        '<a href="javascript:void(0)">'+
                        '<input type="checkbox" id="checkbox-2-'+j+ '\" class="regular-checkbox"  onclick="App.ThreeLevelLinkageCheckbox.SecondCheckboxClick('+i+','+j+')" />' +
                        '<label for="checkbox-2-'+j+'\"></label>'+
                        '<span>'+App.ThreeLevelLinkageCheckbox.second_data[i][j].name + '</span>' +
                        '</a>' +
                        '</li>';
                }
            }
            $(App.ThreeLevelLinkageCheckbox.sort2_id).html(secondCont).show();
            $(App.ThreeLevelLinkageCheckbox.sort3_id).hide();
            $(App.ThreeLevelLinkageCheckbox.sort1_id +" li").eq(i).addClass("active").siblings("li").removeClass("active");
            App.ThreeLevelLinkageCheckbox.expressFirst = App.ThreeLevelLinkageCheckbox.first_data[i];
            $("#selectedSort").html(App.ThreeLevelLinkageCheckbox.expressFirst);

            $(App.ThreeLevelLinkageCheckbox.sort2_id +" label").click(function(event){
                //阻止事件冒泡
                event.stopPropagation();
            });
        },
        InitThirdCheckbox:function (i,j) {
            /**
             * 初始化三级标签
             */

            var third_data_i_j_len = App.ThreeLevelLinkageCheckbox.third_data[i][j].length;
            var thirdCont = "";
            for (var k=0; k<third_data_i_j_len; k++) {
                if(App.ThreeLevelLinkageCheckbox.third_data[i][j][k].status === "checked"){
                    thirdCont += '<li onClick="App.ThreeLevelLinkageCheckbox.InitForthCheckbox(' + i + ',' + j + ',' + k + ');">' +
                        '<a href="javascript:void(0)" style="background-image: none">'+
                        '<input type="checkbox" id="checkbox-3-'+k+ '\" class="regular-checkbox" checked="checked"  onclick="App.ThreeLevelLinkageCheckbox.ThirdCheckboxClick('+i+','+j+','+k+')"  />' +
                        '<label for="checkbox-3-'+k+'\"></label>'+
                        '<span>'+ App.ThreeLevelLinkageCheckbox.third_data[i][j][k].name + '</span>' +
                        '</a>' +
                        '</li>';
                }else {
                    thirdCont += '<li onClick="App.ThreeLevelLinkageCheckbox.InitForthCheckbox(' + i + ',' + j + ',' + k + ');">' +
                        '<a href="javascript:void(0)" style="background-image: none">'+
                        '<input type="checkbox" id="checkbox-3-'+k+ '\" class="regular-checkbox"  onclick="App.ThreeLevelLinkageCheckbox.ThirdCheckboxClick('+i+','+j+','+k+')"  />' +
                        '<label for="checkbox-3-'+k+'\"></label>'+
                        '<span>'+ App.ThreeLevelLinkageCheckbox.third_data[i][j][k].name + '</span>' +
                        '</a>' +
                        '</li>';
                }
            }

            $(App.ThreeLevelLinkageCheckbox.sort3_id).html(thirdCont).show();
            $(App.ThreeLevelLinkageCheckbox.sort2_id +" li").eq(j).addClass("active").siblings("li").removeClass("active");
            App.ThreeLevelLinkageCheckbox.expressSecond = App.ThreeLevelLinkageCheckbox.expressFirst + App.ThreeLevelLinkageCheckbox.arrow + App.ThreeLevelLinkageCheckbox.second_data[i][j];
            $("#selectedSort").html(App.ThreeLevelLinkageCheckbox.expressSecond);

            $(App.ThreeLevelLinkageCheckbox.sort3_id+" label").click(function(event){
                //阻止事件冒泡
                event.stopPropagation();
            });
        },
        InitForthCheckbox:function (i,j,k) {
            $(App.ThreeLevelLinkageCheckbox.sort3_id+" li").eq(k).addClass("active").siblings("li").removeClass("active");
            // expressD = expressC + arrow + district[i][j][k];
            // $("#selectedSort").html(expressD);
        },
        FirstCheckboxClick:function (i) {
            //根据选择框选择状态，修改对应数据的选择状态

            //获取选择框属性
            var checkbox_1_id = "#checkbox-1-"+i;
            App.ThreeLevelLinkageCheckbox.first_data[i].status = $(checkbox_1_id).is(':checked') ? "checked" : "unchecked";

            //修改选择框样式
            if(App.ThreeLevelLinkageCheckbox.first_data[i].status === "checked"){
                $(checkbox_1_id).prop("checked",true);
                $(checkbox_1_id).next().css("background-color", "")
            }else{
                $(checkbox_1_id).prop("checked",false);
                $(checkbox_1_id).next().css("background-color", "")
            }

            /***************************************************************************
             * 根据第一级选择状态修改对应二三级数据状态
             * 选  中：二三级全部修改成选中
             * 未选中：二三级全部修改成未选中
             **************************************************************************/

            var second_data_i_len = App.ThreeLevelLinkageCheckbox.second_data[i].length;//对应二级数据
            var third_data_i_len = App.ThreeLevelLinkageCheckbox.third_data[i].length;//对应三级数据

            if(second_data_i_len > 0){
                //二级有数据
                for(var j = 0;j < second_data_i_len;j ++){
                    App.ThreeLevelLinkageCheckbox.second_data[i][j].status = App.ThreeLevelLinkageCheckbox.first_data[i].status; //修改对应二级数据状态
                    if(third_data_i_len > 0){
                        //总三级有数据
                        //检查此二级对应三级是否有数据
                        var third_data_i_j_len = App.ThreeLevelLinkageCheckbox.third_data[i][j].length;
                        if(third_data_i_j_len > 0){
                            //二级对应的三级有数据
                            for(var k = 0;k < third_data_i_j_len;k ++){
                                //修改对应三级数据状态
                                App.ThreeLevelLinkageCheckbox.third_data[i][j][k].status = App.ThreeLevelLinkageCheckbox.first_data[i].status;//修改三级数据状态
                            }

                        }
                    }
                }
            }
        },
        SecondCheckboxClick:function (i,j) {
            //根据二级选择状态修改二级对应数据状态

            //获取标签属性
            var checkbox_2_id = "#checkbox-2-"+j;
            App.ThreeLevelLinkageCheckbox.second_data[i][j].status = $(checkbox_2_id).is(':checked') ? "checked" : "unchecked";

            //修改标签样式
            if(App.ThreeLevelLinkageCheckbox.second_data[i][j].status === "checked"){
                $(checkbox_2_id).prop("checked",true);
                $(checkbox_2_id).next().css("background-color", "")
            }else{
                $(checkbox_2_id).prop("checked",false);
                $(checkbox_2_id).next().css("background-color", "")
            }
            /***************************************************************************
             * 根据二级数据状态，修改对应一级和三级数据状态
             * 选  中：对应三级数据全部修改成选中
             * 未选中：对应三级数据全部修改成未选中
             * 检查对应一级下的全部二级数据状态，并修改label样式
             * 如果全部是选中，对应一级修改成选中，
             * 如果全部未选中，对应一级修改成未选中，
             * 如果半选中，对应一级修改成半选中
             ***************************************************************************/
                //先修改对应三级数据状态
            var third_data_i_j_len = App.ThreeLevelLinkageCheckbox.third_data[i][j].length;
            if(third_data_i_j_len > 0){
                //对应三级有数据
                for(var k = 0;k < third_data_i_j_len;k ++){
                    //修改对应三级数据状态
                    App.ThreeLevelLinkageCheckbox.third_data[i][j][k].status = App.ThreeLevelLinkageCheckbox.second_data[i][j].status;
                }
            }
            //检查对应一级下的全部二级数据状态，修改对应一级数据状态
            var all_sum = 0;//总数量
            var checked_sum = 0; //选中数量
            var unchecked_sum = 0;//未选中数量

            var second_data_i_len = App.ThreeLevelLinkageCheckbox.second_data[i].length;//对应二级数据

            all_sum = second_data_i_len;
            //计算选择数量
            for(var m=0;m<second_data_i_len;m++){
                if(App.ThreeLevelLinkageCheckbox.second_data[i][m].status === "checked"){
                    checked_sum ++ ;
                }else if(App.ThreeLevelLinkageCheckbox.second_data[i][m].status === "unchecked"){
                    unchecked_sum ++;
                }
            }

            //根据选择状态修改sort-1样式
            var checkbox_1_id = "#checkbox-1-"+i;//一级数据对应的选择框标签checkbox
            if(checked_sum === all_sum){
                //全部选择
                App.ThreeLevelLinkageCheckbox.first_data[i].status = "checked";
                $(checkbox_1_id).prop("checked",true);
                $(checkbox_1_id).next().css("background-color", "")
            }else if(unchecked_sum === all_sum){
                //全部未选中
                App.ThreeLevelLinkageCheckbox.first_data[i].status = "unchecked";
                $(checkbox_1_id).prop("checked",false);
                $(checkbox_1_id).next().css("background-color", "")
            }else{
                //部分选中
                App.ThreeLevelLinkageCheckbox.first_data[i].status = "half_checked";
                $(checkbox_1_id).prop("checked",false);
                $(checkbox_1_id).next().css("background-color", "#bcd3d3")
            }
        },
        ThirdCheckboxClick:function (i,j,k) {
            //根据三级选择状态修改对应数据状态

            //获取标签属性
            var checkbox_3_id = "#checkbox-3-"+k;
            App.ThreeLevelLinkageCheckbox.third_data[i][j][k].status = $(checkbox_3_id).is(':checked') ? "checked" : "unchecked";

            /***************************************************************************
             * 根据三级数据状态，遍历对应二级下的全部三级数据状态，
             * 和对应一级下的全部二级数据状态，修改对应一级和二级数据状态，并修改对应label样式
             *
             * 如果对应二级下的三级全部是选中，对应二级修改成选中，
             * 如果对应二级下的三级全部是未选中，对应二级修改成未选中，
             * 如果对应二级下的三级部分选中，对应二级修改成部分选中，
             *
             * 如果对应一级下的二级全部是选中，对应一级修改成选中，
             * 如果对应一级下的二级全部是未选中，对应一级修改成未选中，
             * 如果对应一级下的二级部分选中，对应一级修改成部分选中
             *
             ***************************************************************************/
                //先检查对应二级下的三级选中状态，修改对应二级数据状态和label样式
            var third_all_sum = 0;//总数量
            var third_checked_sum = 0;//选中数量
            var third_unchecked_sum = 0 ;//未选中数量

            var third_data_i_j_len = App.ThreeLevelLinkageCheckbox.third_data[i][j].length;//二级下的全部三级数据

            third_all_sum = third_data_i_j_len;

            if(third_data_i_j_len > 0){
                //三级有数据
                for(var m = 0;m < third_data_i_j_len;m ++){
                    if(App.ThreeLevelLinkageCheckbox.third_data[i][j][m].status === "checked"){
                        third_checked_sum ++;
                    }else if(App.ThreeLevelLinkageCheckbox.third_data[i][j][m].status === "unchecked"){
                        third_unchecked_sum ++;
                    }
                }
            }
            var checkbox_2_id = "#checkbox-2-"+j; //二级对应标签checkbox
            if(third_checked_sum === third_all_sum){
                //全部选中
                App.ThreeLevelLinkageCheckbox.second_data[i][j].status = "checked";
                $(checkbox_2_id).prop("checked",true);
                $(checkbox_2_id).next().css("background-color", "")
            }else if(third_unchecked_sum === third_all_sum){
                //全部未选中
                App.ThreeLevelLinkageCheckbox.second_data[i][j].status = "unchecked";
                $(checkbox_2_id).prop("checked",false);
                $(checkbox_2_id).next().css("background-color", "")
            }else{
                //部分选中
                App.ThreeLevelLinkageCheckbox.second_data[i][j].status = "half_checked";
                $(checkbox_2_id).prop("checked",false);
                $(checkbox_2_id).next().css("background-color", "#bcd3d3")
            }

            //检查一级下的全部二级数据状态，修改一级数据状态，并修改一级对应标签label样式
            var second_all_sum = 0;//二级总数
            var second_checked_sum = 0;//二级选中数量
            var second_unchecked_sum = 0;//二级未选中数量

            var second_data_i_len = App.ThreeLevelLinkageCheckbox.second_data[i].length;

            second_all_sum = second_data_i_len;

            if(second_data_i_len > 0){
                //二级有数据
                for(var n = 0;n < second_data_i_len;n ++){
                    if(App.ThreeLevelLinkageCheckbox.second_data[i][n].status === "checked"){
                        second_checked_sum ++;
                    }else if(App.ThreeLevelLinkageCheckbox.second_data[i][n].status === "unchecked"){
                        second_unchecked_sum ++;
                    }
                }
            }
            var checkbox_1_id = "#checkbox-1-"+i;
            if(second_checked_sum === second_all_sum){
                //全部选中
                App.ThreeLevelLinkageCheckbox.first_data[i].status = "checked";
                $(checkbox_1_id).prop("checked",true);
                $(checkbox_1_id).next().css("background-color", "")
            }else if(second_unchecked_sum === second_all_sum){
                //全部未选中
                App.ThreeLevelLinkageCheckbox.first_data[i].status = "unchecked";
                $(checkbox_1_id).prop("checked",false);
                $(checkbox_1_id).next().css("background-color", "")
            }else{
                //部分选中
                App.ThreeLevelLinkageCheckbox.first_data[i].status = "half_checked";
                $(checkbox_1_id).prop("checked",false);
                $(checkbox_1_id).next().css("background-color", "#bcd3d3")
            }
        }
    };
    //执行初始化函数
     $(function () {
     var first = [{"_id":"1001","name":"教育","status":"unchecked"}];
     var second = [
     [
     {"_id":"2001","name":"教材","status":"unchecked"},
     {"_id":"2002","name":"外语","status":"unchecked"},
     {"_id":"2003","name":"考试","status":"unchecked"}
     ]
     ];
     var third = [
     [
     [
     {"_id":"3001","name":"研究生/本科","status":"unchecked"},
     {"_id":"3002","name":"高职高专","status":"unchecked"},
     {"_id":"3003","name":"中职中专","status":"unchecked"}
     ],
     [
     {"_id":"3011","name":"英语综合教程","status":"unchecked"},
     {"_id":"3012","name":"英语专项训练","status":"unchecked"},
     {"_id":"3013","name":"英语读物","status":"unchecked"}
     ],
     [
     {"_id":"3021","name":"学历考试","status":"unchecked"},
     {"_id":"3022","name":"公职","status":"unchecked"},
     {"_id":"3023","name":"财税外贸保险","status":"unchecked"},
     {"_id":"3024","name":"建筑工程","status":"unchecked"},
     {"_id":"3025","name":"计算机","status":"unchecked"},
     {"_id":"3016","name":"医药卫生","status":"unchecked"},
     {"_id":"3027","name":"艺术/体育","status":"unchecked"},
     {"_id":"3028","name":"考研","status":"unchecked"},
     {"_id":"3029","name":"公务员","status":"unchecked"}
     ]
     ]
     ];
     App.ThreeLevelLinkageCheckbox.init(first,second,third);
     });
}());