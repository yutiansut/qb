import Kline from './kline'
import {ChartManager} from './chart_manager'
import {ChartSettings} from './chart_settings'
import {DefaultTemplate, Template} from './templates'
import {MEvent} from './mevent'
import $ from "../lib/jquery.min"

export class Control {

    static requestData(showLoading) {
        //请求参数发生变化
        Kline.instance.onRequestChangeFunc(Kline.instance.requestParam);
    }

    static setData(lines){
        this.requestSuccessHandler(lines);
    }

    static requestSuccessHandler(lines) {
        if (Kline.instance.debug) {
            console.log(lines);
        }
        let updateDataRes = Kline.instance.chartMgr.updateData("frame0.k0",lines);
        ChartManager.instance.redraw('All', false);
    }

    static readCookie() {
        ChartSettings.get();
        ChartSettings.save();
        let tmp = ChartSettings.get();
        // 主图样式
        let chart_style = $('#chart_select_chart_style');
        chart_style.find('a').each(function () {
            if ($(this)[0].innerHTML === tmp.charts.chartStyle) {
                $(this).addClass('selected');
            }else{
                $(this).removeClass("selected");
            }
        });
        ChartManager.instance.setChartStyle('frame0.k0', tmp.charts.chartStyle);
        // 交易品种
        let symbol = tmp.charts.symbol;
        if (!Kline.instance.init) {
            symbol = Kline.instance.symbol;
            Kline.instance.init = true;
        }
        Kline.instance.symbol = symbol;
        Control.switchSymbolSelected(symbol);
        // 周期
        let period = tmp.charts.period;
        Control.switchPeriod(period);
        // 技术指标
        if (tmp.charts.indicsStatus === 'close') {
            Control.switchIndic('off');
        } else if (tmp.charts.indicsStatus === 'open') {
            Control.switchIndic('on');
        }
        // 主指标
        let mainIndic = $('#chart_select_main_indicator');
        mainIndic.find('a').each(function () {
            if ($(this).attr('name') === tmp.charts.mIndic) {
                $(this).addClass('selected');
            }else{
                $(this).removeClass("selected");
            }
        });
        ChartManager.instance.getChart().setMainIndicator(tmp.charts.mIndic);
        // 主题
        ChartManager.instance.setThemeName('frame0', tmp.theme);
        // 画图工具
        Control.switchTools('off');
        if (tmp.theme === 'Dark') {
            Control.switchTheme('dark');
        } else if (tmp.theme === 'Light') {
            Control.switchTheme('light');
        }
        // 语言
        Control.chartSwitchLanguage(tmp.language || "zh-cn");
    }

    static setHttpRequestParam(symbol, range, limit, since) {
        return {
            symbol : symbol,
            range : range,
            //limit : limit,
            //since : since
        }
    }

    static refreshTemplate() {
        Kline.instance.chartMgr = DefaultTemplate.loadTemplate("frame0.k0", "");
        ChartManager.instance.redraw('All', true);
    }

    static chartSwitchLanguage(lang) {
        let langTmp = lang.replace(/-/, '_');
        $('#chart_language_switch_tmp').find('span').each(function () {
            let name = $(this).attr('name');
            let attr = $(this).attr(langTmp);
            name = '.' + name;
            let obj = $(name)[0];

            if (!obj)
                return;
            $(name).each(function () {

                $(this)[0].innerHTML = attr;
            });
        });
        //$("#chart_language_setting_div li a[name='" + lang + "']").addClass("selected");
        ChartManager.instance.setLanguage(lang);
        ChartManager.instance.getChart().setTitle();
        let tmp = ChartSettings.get();
        tmp.language = lang;
        ChartSettings.save();
        Kline.instance.onLangChangeFunc(lang);
    }

    static onSize(w, h) {
        let width = w || window.innerWidth;
        let chartWidth=width;
        let height = h || window.innerHeight;
        let container = $(Kline.instance.element);
        container.css({
            width: width + 'px',
            height: height + 'px'
        });
        let toolBar = $('#chart_toolbar');
        let toolPanel = $('#chart_toolpanel');
        let canvasGroup = $('#chart_canvasGroup');
        let tabBar = $('#chart_tabbar');
        let toolPanelShown = toolPanel[0].style.display !== 'inline' ? false : true;
        let tabBarShown = tabBar[0].style.display !== 'block' ? false : true;
        let toolBarRect = {};
        toolBarRect.x = 0;
        toolBarRect.y = 0;
        toolBarRect.w = chartWidth;
        toolBarRect.h = 29;
        let toolPanelRect = {};
        toolPanelRect.x = 0;
        toolPanelRect.y = toolBarRect.h + 1;
        toolPanelRect.w = toolPanelShown ? 32 : 0;
        toolPanelRect.h = height - toolPanelRect.y;
        let tabBarRect = {};
        tabBarRect.w = toolPanelShown ? chartWidth - (toolPanelRect.w + 1 ) : chartWidth;
        tabBarRect.h = tabBarShown ? 25 : -1;
        tabBarRect.x = chartWidth - tabBarRect.w;
        tabBarRect.y = height - (tabBarRect.h + 1 );
        let canvasGroupRect = {};
        canvasGroupRect.x = tabBarRect.x;
        canvasGroupRect.y = toolPanelRect.y;
        canvasGroupRect.w = tabBarRect.w;
        canvasGroupRect.h = tabBarRect.y - toolPanelRect.y;
        toolBar.css({
            left: toolBarRect.x + 'px',
            top: toolBarRect.y + 'px',
            width: toolBarRect.w + 'px',
            height: toolBarRect.h + 'px'
        });
        if (toolPanelShown) {
            toolPanel.css({
                left: toolPanelRect.x + 'px',
                top: toolPanelRect.y + 'px',
                width: toolPanelRect.w + 'px',
                height: toolPanelRect.h + 'px'
            });
        }

        canvasGroup.css({
            left: canvasGroupRect.x + 'px',
            top: canvasGroupRect.y + 'px',
            // width: canvasGroupRect.w + 'px',
            height: canvasGroupRect.h + 'px'
        });
        let mainCanvas = $('#chart_mainCanvas')[0];
        let overlayCanvas = $('#chart_overlayCanvas')[0];
        let dpr = window.devicePixelRatio;
        mainCanvas.width = canvasGroupRect.w * dpr;
        mainCanvas.height = canvasGroupRect.h * dpr;
        overlayCanvas.width = canvasGroupRect.w * dpr;
        overlayCanvas.height = canvasGroupRect.h * dpr;
        $(mainCanvas).css({
            width: canvasGroupRect.w,
            height: canvasGroupRect.h,
        });
        $(overlayCanvas).css({
            width: canvasGroupRect.w,
            height: canvasGroupRect.h,
        });

        if (tabBarShown) {
            tabBar.css({
                left: tabBarRect.x + 'px',
                top: tabBarRect.y + 'px',
                width: tabBarRect.w + 'px',
                height: tabBarRect.h + 'px'
            });
        }
        let dlgSettings = $("#chart_parameter_settings");
        dlgSettings.css({
            left: (window.innerWidth - dlgSettings.width()) >> 1,
            top: (window.innerHeight - dlgSettings.height()) >> 1
        });
        let dlgLoading = $("#chart_loading");
        dlgLoading.css({
            left: (chartWidth - dlgLoading.width()) >> 1,
            top: (height - dlgLoading.height()) >> 2
        });
        let domElemCache = $('#chart_dom_elem_cache');
        let rowTheme = $('#chart_select_theme')[0];
        let rowTools = $('#chart_enable_tools')[0];
        let rowIndic = $('#chart_enable_indicator')[0];
        let symbolTitle=$("#symbol_title")[0];
        let periodsVert = $('#chart_toolbar_periods_vert');
        let periodsHorz = $('#chart_toolbar_periods_horz')[0];
        let showIndic = $('#chart_show_indicator')[0];
        let showTools = $('#chart_show_tools')[0];
        let selectTheme = $('#chart_toolbar_theme')[0];
        let dropDownSettings = $('#chart_dropdown_settings');
        let periodsVertNW = symbolTitle.offsetWidth + periodsVert[0].offsetWidth;
        let periodsHorzNW = periodsVertNW + periodsHorz.offsetWidth;
        let showIndicNW = periodsHorzNW + showIndic.offsetWidth + 4;
        let showToolsNW = showIndicNW + showTools.offsetWidth + 4;
        let selectThemeNW = showToolsNW + selectTheme.offsetWidth;
        let dropDownSettingsW = dropDownSettings.find(".chart_dropdown_t")[0].offsetWidth + 440;
        periodsVertNW += dropDownSettingsW;
        periodsHorzNW += dropDownSettingsW;
        showIndicNW += dropDownSettingsW;
        showToolsNW += dropDownSettingsW;
        selectThemeNW += dropDownSettingsW;
        if (chartWidth < periodsHorzNW) {
            domElemCache.append(periodsHorz);
        } else {
            //periodsVert.after(periodsHorz);
        }
        if (chartWidth < showIndicNW) {
            domElemCache.append(showIndic);
            rowIndic.style.display = "";
        } else {
            dropDownSettings.before(showIndic);
            rowIndic.style.display = "none";
        }
        if (chartWidth < showToolsNW) {
            domElemCache.append(showTools);
            rowTools.style.display = "";
        } else {
            dropDownSettings.before(showTools);
            rowTools.style.display = "none";
        }
        if (chartWidth < selectThemeNW) {
            domElemCache.append(selectTheme);
            rowTheme.style.display = "";
        } else {
            dropDownSettings.before(selectTheme);
            rowTheme.style.display = "none";
        }

        ChartManager.instance.redraw('All', true);
        Kline.instance.onResizeFunc(width, height);
    }

    static mouseWheel(e, delta) {
        ChartManager.instance.scale(delta > 0 ? 1 : -1);
        ChartManager.instance.redraw("All", true);
        return false;
    }

    static switchTheme(name) {
        $('#chart_toolbar_theme a').removeClass('selected');
        $('#chart_select_theme a').removeClass('selected');
        $('#chart_toolbar_theme').find('a').each(function () {
            if ($(this).attr('name') === name) {
                $(this).addClass('selected');
            }
        });
        $('#chart_select_theme a').each(function () {
            if ($(this).attr('name') === name) {
                $(this).addClass('selected');
            }
        });
        $(".chart_container").attr('class', "chart_container " + name);
        $(".marketName_ a").attr('class', name);

        if (name === 'dark') {
            $(".trade_container").addClass("dark").removeClass("light");
            ChartManager.instance.setThemeName('frame0', 'Dark');
            let tmp = ChartSettings.get();
            tmp.theme = 'Dark';
            ChartSettings.save();
        } else if (name === 'light') {
            $(".trade_container").addClass("light").removeClass("dark");
            ChartManager.instance.setThemeName('frame0', 'Light');
            let tmp = ChartSettings.get();
            tmp.theme = 'Light';
            ChartSettings.save();
        }
        let a = {};
        a.command = "set current themes";
        a.content = name;
        $('#chart_output_interface_text').val(JSON.stringify(a));
        $('#chart_output_interface_submit').submit();
        new MEvent().raise(name);
        ChartManager.instance.redraw();

        Kline.instance.onThemeChangeFunc(name);
    }

    static switchTools(name) {
        $(".chart_dropdown_data").removeClass("chart_dropdown-hover");
        $("#chart_toolpanel .chart_toolpanel_button").removeClass("selected");
        $('#chart_enable_tools a').removeClass('selected');
        if (name === 'on') {
            $('#chart_show_tools').addClass('selected');
            $('#chart_enable_tools a').each(function () {
                if ($(this).attr('name') === 'on') {
                    $(this).addClass('selected');
                }
            });
            $('#chart_toolpanel')[0].style.display = 'inline';
            if (ChartManager.instance._drawingTool === ChartManager.DrawingTool.Cursor) {
                $('#chart_Cursor').parent().addClass('selected');
            } else if (ChartManager.instance._drawingTool === ChartManager.DrawingTool.CrossCursor) {
                $('#chart_CrossCursor').parent().addClass('selected');
            }
        } else if (name === 'off') {
            $('#chart_show_tools').removeClass('selected');
            $('#chart_enable_tools a').each(function () {
                if ($(this).attr('name') === 'off') {
                    $(this).addClass('selected');
                }
            });
            $('#chart_toolpanel')[0].style.display = 'none';
            ChartManager.instance.setRunningMode(ChartManager.instance._beforeDrawingTool);
            ChartManager.instance.redraw("All", true);
        }
        if (Kline.instance.isSized) {
            Control.onSize();
        } else {
            Control.onSize(Kline.instance.width, Kline.instance.height);
        }
    }

    static switchIndic(name) {
        $('#chart_enable_indicator a').removeClass('selected');
        $("#chart_enable_indicator a[name='" + name + "']").addClass('selected');
        if (name === 'on') {
            $('#chart_show_indicator').addClass('selected');
            let tmp = ChartSettings.get();
            tmp.charts.indicsStatus = 'open';
            ChartSettings.save();
            let value = tmp.charts.indics[1];
            ChartManager.instance.getChart().setIndicator(1, value);
            $("#chart_tabbar").find('a').each(function () {
                if ($(this).attr('name') === value)
                    $(this).addClass('selected');
            });
            $('#chart_tabbar')[0].style.display = 'block';
        } else if (name === 'off') {
            $('#chart_show_indicator').removeClass('selected');
            ChartManager.instance.getChart().setIndicator(2, 'NONE');
            let tmp = ChartSettings.get();
            tmp.charts.indicsStatus = 'close';
            ChartSettings.save();
            $('#chart_tabbar')[0].style.display = 'none';
            $("#chart_tabbar a").removeClass("selected");
        }
        if (Kline.instance.isSized) {
            Control.onSize();
        } else {
            Control.onSize(Kline.instance.width, Kline.instance.height);
        }
    }

    static switchPeriod(name) {
        $(".chart_container .chart_toolbar_tabgroup a").removeClass("selected");
        $("#chart_toolbar_periods_vert ul a").removeClass("selected");
        $(".chart_container .chart_toolbar_tabgroup a").each(function () {
            if ($(this).parent().attr('name') === name) {
                $(this).addClass('selected');
            }
        });
        $("#chart_toolbar_periods_vert ul a").each(function () {
            if ($(this).parent().attr('name') === name) {
                $(this).addClass('selected');
            }
        });
        ChartManager.instance.showCursor();
        Control.calcPeriodWeight(name);
        if (name === 'line') {
            ChartManager.instance.getChart().strIsLine = true;
            ChartManager.instance.setChartStyle('frame0.k0', 'Line');
            ChartManager.instance.getChart().setCurrentPeriod('line');
            let settings = ChartSettings.get();
            settings.charts.period = name;
            ChartSettings.save();
            return;
        }
        ChartManager.instance.getChart().strIsLine = false;
        let p = Kline.instance.tagMapPeriod[name];
        ChartManager.instance.setChartStyle('frame0.k0', ChartSettings.get().charts.chartStyle);
        ChartManager.instance.getChart().setCurrentPeriod(p);
        let settings = ChartSettings.get();
        settings.charts.period = name;
        ChartSettings.save();
    }

    /*
    static switchDepth(name){
        let tmp = ChartSettings.get();
        if(name==="on"){
            tmp.charts.depthStatus="open";
            $("#chart_show_depth").addClass("selected");
            ChartManager.instance.getChart().updateDepth(Kline.instance.data.depths);
        }else if(name==="off"){
            tmp.charts.depthStatus="close";
            $("#chart_show_depth").removeClass("selected");
            ChartManager.instance.getChart().updateDepth(null);
        }
        ChartSettings.save();
    }
    */

    static reset(symbol) {
        Kline.instance.symbol = symbol;
    }

    static switchSymbolSelected(symbol,symbolName) {
        Control.reset(symbol);
        $(".symbol-title").text(symbolName);
        ChartManager.instance.getChart()._symbol = symbol;
        let settings = ChartSettings.get();
        settings.charts.symbol = symbol;
        ChartSettings.save();
    }

    static switchSymbol(symbol,symbolName) {
        Control.switchSymbolSelected(symbol,symbolName);
        let settings = ChartSettings.get();
        if (settings.charts.period === "line") {
            ChartManager.instance.getChart().strIsLine = true;
            ChartManager.instance.setChartStyle('frame0.k0', 'Line');
        } else {
            ChartManager.instance.getChart().strIsLine = false;
            ChartManager.instance.setChartStyle('frame0.k0', ChartSettings.get().charts.chartStyle);
        }
        ChartManager.instance.getChart().setSymbol(symbol);
    }

    static calcPeriodWeight(period) {
        let index = period;
        if (period !== 'line')
            index = Kline.instance.periodMap[Kline.instance.tagMapPeriod[period]];
        let periodWeight = ChartSettings.get().charts.period_weight;
        for (let i in periodWeight) {
            if (periodWeight[i] > periodWeight[index]) {
                periodWeight[i] -= 1;
            }
        }
        periodWeight[index] = 8;
        ChartSettings.save();
    }
}

Control.refreshCounter = 0;
Control.refreshHandler = null;
