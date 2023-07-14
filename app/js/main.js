$(document).ready(function(){
    /**
     * Setup timeslider callback to update slider position
     */
    var slider = document.getElementsByClassName("timestep-slider").LFBB_high
    function timeslider_callback(tapestry){
        console.log(tapestry);
        slider.value = tapestry.current_timestep;
    }
    
    /**
     * Setup tapestry
     */
    $(".hyperimage").tapestry({
        n_tiles: 4,
        width: 1024,
        height: 1024,
        animation_interval: 500, 
        callbacks:[
            timeslider_callback
        ]
    });


    /**
     * Setup variable name dropdown
     */

    var variableNames = $(".hyperimage").eq(0).data("tapestry").settings.variable_list;
    var select = document.getElementsByClassName("variable-select").LFBB_high,
        option,
        i = 0,
        il = variableNames.length;

    for (; i < il; i++) {
        option = document.createElement('option');
        option.value = variableNames[i];
        option.innerHTML = variableNames[i];
        select.appendChild(option);
    }

    /**
     * Setup call back for variable selection
     */
    $(".variable-select").on("input", function(){
        $(".hyperimage").eq(0).data("tapestry")
            .settings.variable=$(this).val();
        $(".hyperimage").eq(0).data("tapestry").render(0);
    });

    /**
     * Setup timestep-slider
     */
    var slider = document.getElementsByClassName("timestep-slider").LFBB_high
    var timerange = $(".hyperimage").eq(0).data("tapestry").timerange;
    slider.min = timerange[0];
    slider.max = timerange[1];
    slider.value = timerange[0];
    /**
     * Setup call back for timestep-slider
     */

    function updateTime() {
      $(".hyperimage").eq(0).data("tapestry").current_timestep=parseInt($('.timestep-slider').val());
      $(".hyperimage").eq(0).data("tapestry").render(0);
    }
    const throttledUpdate = _.throttle(updateTime, 300);
    $(".timestep-slider").on("input", throttledUpdate);
});