
//sample data
var data3 = [
    { name : 'Men with beards spend more money on beer', value: 35 },
    { name : 'Someone does something else', value: 73 },
    { name : 'Someone does something else', value: 124 },
];

//ui
var $content = $("#content");
$content.hide();

var $showText = function(){
    $("circle").hover(function() {
        $select = $("g circle title");
        $title = $(this).text();
        $("#questions").text($title) }, function(){});
};

var $makePages = function(){
    $("ol li").each(function(i){
        if (i < 10) {
            $(this).addClass("page1");
        } else if (i < 20 && i >= 10 ){
           // $("ol").attr("start", "10");
            $(this).addClass("page2").hide();
        } else if (i < 30 && i >= 20 ){
           // $("ol").attr("start", "20");
            $(this).addClass("page3").hide();
        } else if (i < 40 && i >= 30 ){
           // $("ol").attr("start", "30");
            $(this).addClass("page4").hide();
        } else if (i < 50 && i >= 40 ){
          //  $("ol").attr("start", "40");
            $(this).addClass("page5").hide();
        } else {
            $(this).addClass("overflow").remove();
        }
    });
};

var $goToPage = function(pageNumber){
    for (i = 0; i < 6; i++){
        $(".page" + i).hide();
        $(".p" + i).removeClass("disabled");
    }
    $(".page" + pageNumber).show();
    $("ol").attr("start", "" + (pageNumber*10) - 9 + "");

    //for Bootstrap pagination links (corresponding to page numbers)
    $(".p" + pageNumber).addClass("disabled");
}

var $titles = $("g circle title");


$(".bubble").click(function(){
    $("#caption").hide();
    $(".pagination").hide();

    $("#questions").show();
    $("#legend").show();
    $content.hide()
        .delay(300)
        .slideDown();
    bubble();
});

$(".list").click(function(){
    $("#caption").show().text("Insights Leaderboard");
    $(".pagination").show();


    $("#legend").hide();
    $("#questions").hide();
    $content.hide()
        .delay(300)
        .slideDown();
    list();
});


var removeChart = function() {
    var $list = $("#chart ol");
    var $bub = $("#chart svg");
    if ($list.length > 0 || $bub.length > 0){
        $list.remove();
        $bub.remove();
    }
};

var list = function(){
    removeChart();
    d3.csv("data2.csv", function(data){
        var vis = d3.select("#chart").append("ol").attr("class", "insightList");
        var selection = vis.selectAll("li")
            .data(data)
            .enter()
            .append("li")
            .transition()
            .delay(function(d, i) { return i * 30 })
            .duration(700)
            .text(function(data){ return data.name})
        $makePages();
    });
}

var bubble = function(){
    removeChart();
    d3.csv("data2.csv", function(data){
        var min = d3.min(data, function(d){return d.value;});
        var max = d3.max(data, function(d){return d.value;});
        var w = 960,
            h = 500,
            color = d3.scale.category10();
        scale = d3.scale.linear()
            .domain([min, max])
            .range([0, w]);
        scale(data.value);
        var vis = d3.select("#chart").append("svg")
            .attr("width" , w)
            .attr("height", h)
        var bubble_layout = d3.layout.pack()
            .sort(function() {return 0.5 - Math.random()})
            .size([w,h])
            .padding(0);
        var selection = vis.selectAll("g.node")
            .data(bubble_layout.nodes({children: data})
                .filter(function(d) { return !d.children; }));
        var node = selection.enter().append("g")
            .attr("class", "node")
            .attr("transform", function(d) { return "translate(" + 0 + ", " + 0 + ")"; })
            .filter(function(d){
                return d.value > 0;
            });
        node.append("circle").attr("r", "0")
            .transition()
            .delay(function(d, i) { return i * 100 })
            .duration(4000)
            .ease("elastic")
            .attr("transform", function(d) { return "translate(" + d.x + ", " + d.y + ")"; })
            .attr("r", function(d) { return d.r; })

        node.style("fill", function(d) { return color(scale(d.value)); });
        node.append("text")
            .transition()
            .delay(function(d, i) { return i * 120 })
            .ease("elastic")
            .attr("text-anchor", "middle")
            .attr("dy", ".3em")
            //.text(function(d) { return d.value; });
        vis.selectAll("circle").append("svg:title")
            .text(function(d) { return d.name; });
        $showText();
    });
};