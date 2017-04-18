(function () {
    "use strict";
    //Global define
    if (typeof App != "object") {
        window.App = {};
    }
    App.Sure = {};
    App.BaseUrl = "/";
}());
(function () {
    "use strict";
    App.Sure = {
        SureClick:function () {
            /*
             * 模态框确定按钮
             */
            var third_data = App.ThreeLevelLinkageCheckbox.GetChangeData().third;

            var ids = []; //最终返回的数据

            var len = third_data.length;
            if(len > 0){
                for(var i=0;i<len;i++){
                    var third_i_arr = third_data[i];
                    var i_arr_len = third_i_arr.length;
                    if(i_arr_len > 0){
                        for(var j = 0;j<i_arr_len;j++){
                            var j_arr = third_data[i][j];
                            var j_arr_len = j_arr.length;
                            if(j_arr_len > 0){
                                for(var k=0;k<j_arr_len;k++){
                                    if(third_data[i][j][k].status === "checked"){
                                        ids.push(third_data[i][j][k]._id)
                                    }
                                }
                            }
                        }
                    }
                }
            }
            console.log(ids)
            alert(JSON.stringify(ids));
        }
    };
}());