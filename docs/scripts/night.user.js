// ==UserScript==
// @name              自用夜间模式
// @namespace         
// @version           0.2
// @description       油猴脚本，任意网站的夜间模式 来自https://greasyfork.org/zh-CN/scripts/436455-%E5%A4%9C%E9%97%B4%E6%A8%A1%E5%BC%8F%E5%8A%A9%E6%89%8B/code 修改
// @author            mo
// @match             *://*/*
// @require           https://unpkg.com/darkrule@latest/dist/rule.min.js
// @require           https://unpkg.com/sweetalert2@10.16.6/dist/sweetalert2.min.js
// @resource          swalStyle https://unpkg.com/sweetalert2@10.16.6/dist/sweetalert2.min.css
// @run-at            document-start
// @grant             GM_getValue
// @grant             GM_setValue
// @grant             GM_registerMenuCommand
// @grant             GM_getResourceText
// @license           MIT
// @icon              data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAxMjggMTI4Ij48cGF0aCBkPSJNOTMuNSA5NC42YzEwLjYgMCAyMC4zLTMuMyAyOC4yLTktOC4zIDIyLjUtMzAuMiAzOC42LTU2IDM4LjYtMzIuNyAwLTU5LjMtMjUuOC01OS4zLTU3LjdTMzIuOSA4LjcgNjUuNyA4LjdoMi4yQzU0LjYgMTcgNDUuNyAzMS41IDQ1LjcgNDhjMCAyNS43IDIxLjQgNDYuNiA0Ny44IDQ2LjZ6IiBmaWxsPSIjZmZiNTc4Ii8+PHBhdGggZD0iTTEyMS42IDgxLjhjLS44IDAtMS42LjItMi4zLjctNy41IDUuMy0xNi41IDguMS0yNS44IDguMS0yNC4yIDAtNDMuOS0xOS4xLTQzLjktNDIuNyAwLTE0LjcgNy42LTI4LjEgMjAuMy0zNiAxLjEtLjcgMS44LTEuOSAxLjgtMy4yYTMuOCAzLjggMCAwIDAtMy44LTMuOGgtMi4zQzMwLjggNC45IDIuNSAzMi41IDIuNSA2Ni41UzMwLjggMTI4IDY1LjcgMTI4YzI2LjcgMCA1MC43LTE2LjUgNTkuNi00MSAuMS0uNC4yLS45LjItMS4zIDAtMi4xLTEuNy0zLjktMy45LTMuOXptLTU1LjkgMzguNWMtMzAuNSAwLTU1LjQtMjQuMi01NS40LTUzLjkgMC0yNi4yIDE5LjQtNDguNiA0NS43LTUzLjEtOSA5LjQtMTQuMiAyMS44LTE0LjIgMzQuNyAwIDI3LjggMjMuMiA1MC40IDUxLjcgNTAuNCA2LjcgMCAxMy4yLTEuMiAxOS4zLTMuNi0xMCAxNS44LTI3LjggMjUuNS00Ny4xIDI1LjV6bTM1LjYtNDcuOUg3Ny45Yy0xLjYgMC0yLjktMS4zLTIuOS0yLjkgMC0xIC41LTEuOSAxLjMtMi40TDkxLjYgNTdINzcuOWMtMS42IDAtMi45LTEuMy0yLjktMi45czEuMy0yLjkgMi45LTIuOWgyMy40YzEuNiAwIDIuOSAxLjMgMi45IDIuOSAwIDEtLjUgMS45LTEuMyAyLjRMODcuNiA2Ni42aDEzLjdjMS42IDAgMi45IDEuMyAyLjkgMi45cy0xLjMgMi45LTIuOSAyLjl6bTEzLjItMzEuMWgtMTQuNGMtMS42IDAtMi45LTEuMy0yLjktMi45IDAtMSAuNS0xLjkgMS4zLTIuNGw2LjMtNC4xaC00LjdjLTEuNiAwLTIuOS0xLjMtMi45LTIuOXMxLjMtMi45IDIuOS0yLjloMTQuNGMxLjYgMCAyLjkgMS4zIDIuOSAyLjkgMCAxLS41IDEuOS0xLjMgMi40bC02LjMgNC4xaDQuN2MxLjYgMCAyLjkgMS4zIDIuOSAyLjlzLTEuMyAyLjktMi45IDIuOXptNS42LTI3LjVIMTA4Yy0xLjYgMC0yLjktMS4zLTIuOS0yLjkgMC0xIC41LTEuOSAxLjMtMi40bDQuMS0yLjdIMTA4Yy0xLjYgMC0yLjktMS4zLTIuOS0yLjlTMTA2LjQgMCAxMDggMGgxMi4xYzEuNiAwIDIuOSAxLjMgMi45IDIuOSAwIDEtLjUgMS45LTEuMyAyLjRMMTE3LjYgOGgyLjRjMS42IDAgMi45IDEuMyAyLjkgMi45cy0xLjIgMi45LTIuOCAyLjl6IiBmaWxsPSIjNDQ0Ii8+PC9zdmc+
// ==/UserScript==
 
;(function () {
    'use strict';
 
    let util = {
        getValue(name) {
            return GM_getValue(name);
        },
 
        setValue(name, value) {
            GM_setValue(name, value);
        },
 
        addStyle(id, tag, css) {
            tag = tag || 'style';
            let doc = document, styleDom = doc.getElementById(id);
            if (styleDom) return;
            let style = doc.createElement(tag);
            style.rel = 'stylesheet';
            style.id = id;
            tag === 'style' ? style.innerHTML = css : style.href = css;
            doc.head.appendChild(style);
        },
 
        addThemeColor(color) {
            let doc = document, meta = doc.getElementsByName('theme-color')[0];
            if (meta) return meta.setAttribute('content', color);
            let metaEle = doc.createElement('meta');
            metaEle.name = 'theme-color';
            metaEle.content = color;
            doc.head.appendChild(metaEle);
        },
 
        getThemeColor() {
            let meta = document.getElementsByName('theme-color')[0];
            if (meta) {
                return meta.content;
            }
            return '#ffffff';
        },
 
        removeElementById(eleId) {
            let ele = document.getElementById(eleId);
            ele && ele.parentNode.removeChild(ele);
        },
 
        hasElementById(eleId) {
            return document.getElementById(eleId);
        },

        hover(ele, fn1, fn2) {
            ele.onmouseenter = function () {  //移入事件
                fn1.call(ele);
            };
            ele.onmouseleave = function () { //移出事件
                fn2.call(ele);
            };
        },
 
        filter: '-webkit-filter: url(#dark-mode-filter) !important; filter: url(#dark-mode-filter) !important;',
        reverseFilter: '-webkit-filter: url(#dark-mode-reverse-filter) !important; filter: url(#dark-mode-reverse-filter) !important;',
        firefoxFilter: `filter: url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg"><filter id="dark-mode-filter" color-interpolation-filters="sRGB"><feColorMatrix type="matrix" values="0.283 -0.567 -0.567 0 0.925 -0.567 0.283 -0.567 0 0.925 -0.567 -0.567 0.283 0 0.925 0 0 0 1 0"/></filter></svg>#dark-mode-filter') !important;`,
        firefoxReverseFilter: `filter: url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg"><filter id="dark-mode-reverse-filter" color-interpolation-filters="sRGB"><feColorMatrix type="matrix" values="0.333 -0.667 -0.667 0 1 -0.667 0.333 -0.667 0 1 -0.667 -0.667 0.333 0 1 0 0 0 1 0"/></filter></svg>#dark-mode-reverse-filter') !important;`,
        noneFilter: '-webkit-filter: none !important; filter: none !important;',
    };
 
    let main = {
        /**
         * 配置默认值
         */
        initValue() {
            let value = [{
                name: 'dark_mode',
                value: 'light'
            }, {
                name: 'button_position',
                value: 'left'
            }, {
                name: 'button_size',
                value: 30
            }, {
                name: 'include_list',
                value: []
            }, {
                name: 'origin_theme_color',
                value: '#ffffff'
            }];
 
            value.forEach((v) => {
                util.getValue(v.name) === undefined && util.setValue(v.name, v.value);
            });
        },
        /*****************************************************************************/ 
        addExtraStyle() {
            try {
                return darkModeRule;
            } catch (e) {
                return '';
            }
        },
 
        createDarkFilter() {
            if (util.hasElementById('dark-mode-svg')) return;
            let svgDom = '<svg id="dark-mode-svg" style="height: 0; width: 0;"><filter id="dark-mode-filter" x="0" y="0" width="99999" height="99999"><feColorMatrix type="matrix" values="0.283 -0.567 -0.567 0 0.925 -0.567 0.283 -0.567 0 0.925 -0.567 -0.567 0.283 0 0.925 0 0 0 1 0"></feColorMatrix></filter><filter id="dark-mode-reverse-filter" x="0" y="0" width="99999" height="99999"><feColorMatrix type="matrix" values="0.333 -0.667 -0.667 0 1 -0.667 0.333 -0.667 0 1 -0.667 -0.667 0.333 0 1 0 0 0 1 0"></feColorMatrix></filter></svg>';
            let div = document.createElementNS('http://www.w3.org/1999/xhtml', 'div');
            div.innerHTML = svgDom;
            let frag = document.createDocumentFragment();
            while (div.firstChild)
                frag.appendChild(div.firstChild);
            document.head.appendChild(frag);
        },
 
        createDarkStyle() {
            util.addStyle('dark-mode-style', 'style', `
                @media screen {
                    html {
                        ${this.isFirefox() ? util.firefoxFilter : util.filter}
                        scrollbar-color: #454a4d #202324;
                    }
            
                    /* Default Reverse rule */
                    img, 
                    video, 
                    iframe,
                    canvas,
                    :not(object):not(body) > embed,
                    object,
                    svg image,
                    [style*="background:url"],
                    [style*="background-image:url"],
                    [style*="background: url"],
                    [style*="background-image: url"],
                    [background],
                    twitterwidget,
                    .sr-reader,
                    .no-dark-mode,
                    .sr-backdrop {
                        ${this.isFirefox() ? util.firefoxReverseFilter : util.reverseFilter}
                    }
            
                    [style*="background:url"] *,
                    [style*="background-image:url"] *,
                    [style*="background: url"] *,
                    [style*="background-image: url"] *,
                    input,
                    [background] *,
                    img[src^="https://s0.wp.com/latex.php"],
                    twitterwidget .NaturalImage-image {
                        ${util.noneFilter}
                    }
            
                    /* Text contrast */
                    html {
                        text-shadow: 0 0 0 !important;
                    }
            
                    /* Full screen */
                    .no-filter,
                    :-webkit-full-screen,
                    :-webkit-full-screen *,
                    :-moz-full-screen,
                    :-moz-full-screen *,
                    :fullscreen,
                    :fullscreen * {
                        ${util.noneFilter}
                    }
                    
                    ::-webkit-scrollbar {
                        background-color: #202324;
                        color: #aba499;
                    }
                    ::-webkit-scrollbar-thumb {
                        background-color: #454a4d;
                    }
                    ::-webkit-scrollbar-thumb:hover {
                        background-color: #575e62;
                    }
                    ::-webkit-scrollbar-thumb:active {
                        background-color: #484e51;
                    }
                    ::-webkit-scrollbar-corner {
                        background-color: #181a1b;
                    }
            
                    /* Page background */
                    html {
                        background: #fff !important;
                    }
                    
                    ${this.addExtraStyle()}
                }
            
                @media print {
                    .no-print {
                        display: none !important;
                    }
                }`);
        },

        /*****************************************************************************/ 
        isFullScreen() {
            return document.fullscreenElement;
        },
 
        isFirefox() {
            return /Firefox/i.test(navigator.userAgent);
        },
       
        isDarkMode() {
            return util.getValue('dark_mode') === 'dark';
        },
 
        isInIncludeList() {
            return util.getValue('include_list').includes(location.host);
        },

        isTopWindow() {
            return window.self === window.top;
        },
          addListener() {
            document.addEventListener("fullscreenchange", (e) => {
                if (this.isFullScreen()) {
                    //进入全屏
                    this.disableDarkMode();
                } else {
                    //退出全屏
                    this.isDarkMode() && this.enableDarkMode();
                }
            });
        },
 
        
        addIncludeList(){
            let domain = location.host;
            var includeDomains = util.getValue('include_list');
            includeDomains.push(domain);
            util.setValue('include_list' ,includeDomains);
        },

            
        removeIncludeList(){
            var domain = location.host;
            var includeDomains = util.getValue('include_list');
            var index = includeDomains.indexOf(domain);
            includeDomains.splice(index, 1);
            util.setValue('include_list', includeDomains);
        },

       
        setThemeColor() {
            util.setValue('origin_theme_color', util.getThemeColor());
        },
 
        enableDarkMode() {
            if (this.isFullScreen()) return;
            !this.isFirefox() && this.createDarkFilter();
            this.createDarkStyle();
            util.addThemeColor('#131313')
        },
 
        disableDarkMode() {
            util.removeElementById('dark-mode-svg');
            util.removeElementById('dark-mode-style');
            util.addThemeColor(util.getValue('origin_theme_color'))
        },
 
        /**************************************************************************** */
        addButton() {
            if (this.isTopWindow()) {
                let buttonSize = util.getValue('button_size');
                let buttonPosition = util.getValue('button_position');
                let svgSize = parseInt(buttonSize * 0.6);
                let buttonWidth = +buttonSize + 2;
                let html = `<div class="no-print" id="darkmode-container" style="position: fixed; ${buttonPosition}: -${buttonWidth / 2}px; bottom: 25px; cursor: pointer; z-index: 2147483647; user-select: none;"><div id="list-button" style="width: ${buttonSize}px; height: ${buttonSize}px; background: #fff; border: 1px solid #f6f6f6; display: flex; align-items: center; justify-content: center; border-radius: 50%; position: relative; margin-bottom: 10px;"><svg fill="#009fe8" id="svg-add" style="width: ${svgSize}px; height: ${svgSize}px; margin: 0; padding: 0; transition: transform 0.3s, opacity 0.3s; position: absolute; ${!this.isInIncludeList() ? 'transform: scale(0); opacity: 0;' : ''}" viewBox="0 0 1024 1024" xmlns="http://www.w3.org/2000/svg"><path d="M512 832a32 32 0 0 1-32-32V544H224a32 32 0 0 1 0-64h256V224a32 32 0 0 1 64 0v256h256a32 32 0 0 1 0 64H544v256a32 32 0 0 1-32 32"></path></svg><svg fill="#009fe8" id="svg-remove" style="width: ${svgSize}px; height: ${svgSize}px; margin: 0; padding: 0; transition: transform 0.3s, opacity 0.3s; position: absolute; ${this.isInIncludeList() ? 'transform: scale(0); opacity: 0;' : ''}" viewBox="0 0 1024 1024" xmlns="http://www.w3.org/2000/svg"><path d="M832 256h-160v-64a96 96 0 0 0-96-96h-128a96 96 0 0 0-96 96v64H192a32 32 0 0 0 0 64h640a32 32 0 0 0 0-64z m-416-64a32 32 0 0 1 32-32h128a32 32 0 0 1 32 32v64h-192v-64z"></path><path d="M704 384a32 32 0 0 0-32 32v352a32 32 0 0 1-32 32H384a32 32 0 0 1-32-32V416a32 32 0 0 0-64 0v352a96 96 0 0 0 96 96h256a96 96 0 0 0 96-96V416a32 32 0 0 0-32-32z"></path><path d="M480 512v192a32 32 0 0 0 64 0v-192a32 32 0 0 0-64 0M608 512v192a32 32 0 0 0 64 0v-192a32 32 0 0 0-64 0"></path></svg></div><div id="darkmode-button" style="width: ${buttonSize}px; height: ${buttonSize}px; background: #fff; border: 1px solid #f6f6f6; display: flex; align-items: center; justify-content: center; border-radius: 50%; position: relative;"><svg fill="#009fe8" id="svg-light" style="width: ${svgSize}px; height: ${svgSize}px; margin: 0; padding: 0; transition: transform 0.3s, opacity 0.3s; position: absolute; ${!this.isDarkMode() ? 'transform: scale(0); opacity: 0;' : ''}" viewBox="0 0 1024 1024" xmlns="http://www.w3.org/2000/svg"><path d="M587.264 104.96c33.28 57.856 52.224 124.928 52.224 196.608 0 218.112-176.128 394.752-393.728 394.752-29.696 0-58.368-3.584-86.528-9.728C223.744 832.512 369.152 934.4 538.624 934.4c229.376 0 414.72-186.368 414.72-416.256 1.024-212.992-159.744-389.12-366.08-413.184z"></path><path d="M340.48 567.808l-23.552-70.144-70.144-23.552 70.144-23.552 23.552-70.144 23.552 70.144 70.144 23.552-70.144 23.552-23.552 70.144zM168.96 361.472l-30.208-91.136-91.648-30.208 91.136-30.208 30.72-91.648 30.208 91.136 91.136 30.208-91.136 30.208-30.208 91.648z"></path></svg><svg fill="#009fe8" id="svg-dark" style="width: ${svgSize}px; height: ${svgSize}px; margin: 0; padding: 0; transition: transform 0.3s, opacity 0.3s; position: absolute; ${this.isDarkMode() ? 'transform: scale(0); opacity: 0;' : ''}" viewBox="0 0 1024 1024" xmlns="http://www.w3.org/2000/svg"><path d="M234.24 512a277.76 277.76 0 1 0 555.52 0 277.76 277.76 0 1 0-555.52 0zM512 187.733a42.667 42.667 0 0 1-42.667-42.666v-102.4a42.667 42.667 0 0 1 85.334 0v102.826A42.667 42.667 0 0 1 512 187.733zm-258.987 107.52a42.667 42.667 0 0 1-29.866-12.373l-72.96-73.387a42.667 42.667 0 0 1 59.306-59.306l73.387 72.96a42.667 42.667 0 0 1 0 59.733 42.667 42.667 0 0 1-29.867 12.373zm-107.52 259.414H42.667a42.667 42.667 0 0 1 0-85.334h102.826a42.667 42.667 0 0 1 0 85.334zm34.134 331.946a42.667 42.667 0 0 1-29.44-72.106l72.96-73.387a42.667 42.667 0 0 1 59.733 59.733l-73.387 73.387a42.667 42.667 0 0 1-29.866 12.373zM512 1024a42.667 42.667 0 0 1-42.667-42.667V878.507a42.667 42.667 0 0 1 85.334 0v102.826A42.667 42.667 0 0 1 512 1024zm332.373-137.387a42.667 42.667 0 0 1-29.866-12.373l-73.387-73.387a42.667 42.667 0 0 1 0-59.733 42.667 42.667 0 0 1 59.733 0l72.96 73.387a42.667 42.667 0 0 1-29.44 72.106zm136.96-331.946H878.507a42.667 42.667 0 1 1 0-85.334h102.826a42.667 42.667 0 0 1 0 85.334zM770.987 295.253a42.667 42.667 0 0 1-29.867-12.373 42.667 42.667 0 0 1 0-59.733l73.387-72.96a42.667 42.667 0 1 1 59.306 59.306l-72.96 73.387a42.667 42.667 0 0 1-29.866 12.373z"></path></svg></div></div>`;
                document.body.insertAdjacentHTML('beforeend', html);
 
                let containerDOM = document.getElementById('darkmode-container');

                let darkmodeButton = document.getElementById('darkmode-button');
                let lightDOM = document.getElementById('svg-light');
                let darkDOM = document.getElementById('svg-dark');
 
                util.hover(containerDOM, () => {
                    containerDOM.style[buttonPosition] = '0px';
                    containerDOM.style.transition = `${buttonPosition} 0.3s`
                }, () => {
                    containerDOM.style[buttonPosition] = `-${buttonWidth / 2}px`;
                    containerDOM.style.transition = `${buttonPosition} 0.3s`
                });
 
                darkmodeButton.addEventListener("click", () => {
                    if (this.isDarkMode()) { //黑暗模式变为正常模式
                        util.setValue('dark_mode', 'light');
                        this.disableDarkMode();
                        this.renewButton();
                    } else {
                        util.setValue('dark_mode', 'dark');
                        this.enableDarkMode();
                        this.renewButton();
                    }
                });

                let listButtonDOM = document.getElementById('list-button');
                let addDOM = document.getElementById('svg-add');
                let removeDOM = document.getElementById('svg-remove');

                listButtonDOM.addEventListener("click", () => {
                    if (this.isInIncludeList()) {
                        this.removeIncludeList();
                        this.renewButton();
                    } else {
                        this.addIncludeList();
                        this.renewButton();
                    }
                });
                this.renewButton();
            }
        },
        renewButton() {
            let lightDOM = document.getElementById('svg-light');
            let darkDOM = document.getElementById('svg-dark');

            if (this.isDarkMode()) {
                lightDOM.style.transform = 'scale(1)';
                lightDOM.style.opacity = '1';
                darkDOM.style.transform = 'scale(0)';
                darkDOM.style.opacity = '0'; 
            } else {
                lightDOM.style.transform = 'scale(0)';
                lightDOM.style.opacity = '0';
                darkDOM.style.transform = 'scale(1)';
                darkDOM.style.opacity = '1'; 
            }
            let addDOM = document.getElementById('svg-add');
            let removeDOM = document.getElementById('svg-remove');
            if (this.isInIncludeList()) {
                removeDOM.style.transform = 'scale(1)';
                removeDOM.style.opacity = '1';
                addDOM.style.transform = 'scale(0)';
                addDOM.style.opacity = '0';
            } else {
                removeDOM.style.transform = 'scale(0)';
                removeDOM.style.opacity = '0';
                addDOM.style.transform = 'scale(1)';
                addDOM.style.opacity = '1';
            }
        },

        /*****************************************************************************/
 
        registerMenuCommand() {
            if (this.isTopWindow()) {
                let includeList = util.getValue('include_list');
                let host = location.host;
                if (includeList.includes(host)) {
                    GM_registerMenuCommand('💡 当前网站：✔️', () => {
                        this.removeIncludeList();
                        history.go(0);
                    });
                } else {
                    GM_registerMenuCommand('💡 当前网站：❌', () => {
                        this.addIncludeList(); 
                        history.go(0);
                    });
                }
 
                GM_registerMenuCommand('⚙️ 设置', () => {
                    let style = `
                                .darkmode-popup { font-size: 14px !important; }
                                .darkmode-center { display: flex;align-items: center; }
                                .darkmode-setting-label { display: flex;align-items: center;justify-content: space-between;padding-top: 15px; }
                                .darkmode-setting-label-col { display: flex;align-items: flex-start;;padding-top: 15px;flex-direction:column }
                                .darkmode-setting-radio { width: 16px;height: 16px; }
                                .darkmode-setting-textarea { width: 100%; margin: 14px 0 0; height: 100px; resize: none; border: 1px solid #bbb; box-sizing: border-box; padding: 5px 10px; border-radius: 5px; color: #666; line-height: 1.2; }
                                .darkmode-setting-input { border: 1px solid #bbb; box-sizing: border-box; padding: 5px 10px; border-radius: 5px; width: 100px}
                            `;
                    util.addStyle('darkmode-style', 'style', style);
                    util.addStyle('swal-pub-style', 'style', GM_getResourceText('swalStyle'));
                    let includeListStr = util.getValue('include_list').join('\n');
 
                    let dom = `<div style="font-size: 1em;">
                              <label class="darkmode-setting-label">按钮位置 <div id="S-Dark-Position" class="darkmode-center"><input type="radio" name="buttonPosition" ${util.getValue('button_position') === 'left' ? 'checked' : ''} class="darkmode-setting-radio" value="left">左 <input type="radio" name="buttonPosition" style="margin-left: 30px;" ${util.getValue('button_position') === 'right' ? 'checked' : ''} class="darkmode-setting-radio" value="right">右</div></label>
                              <label class="darkmode-setting-label"><span style="text-align: left;">按钮大小（默认：30）<small id="currentSize">当前：${util.getValue('button_size')}</small></span>
                              <input id="S-Dark-Size" type="range" class="darkmode-setting-range" min="20" max="50" step="2" value="${util.getValue('button_size')}">
                              </label>
                              <label class="darkmode-setting-label-col">按照系统自动夜间模式： <textarea placeholder="列表中的域名将按照系统开启夜间模式，一行一个" id="S-Dark-Include" class="darkmode-setting-textarea">${includeListStr}</textarea></label>
                            </div>`;
                    Swal.fire({
                        title: '夜间模式配置',
                        html: dom,
                        icon: 'info',
                        showCloseButton: true,
                        confirmButtonText: '保存',
                        customClass: {
                            popup: 'darkmode-popup',
                        },
                    }).then((res) => {
                        res.isConfirmed && history.go(0);
                    });
 
                    document.getElementById('S-Dark-Position').addEventListener('click', (e) => {
                        e.target.tagName === "INPUT" && util.setValue('button_position', e.target.value);
                    });
                    document.getElementById('S-Dark-Size').addEventListener('change', (e) => {
                        util.setValue('button_size', e.currentTarget.value);
                        document.getElementById('currentSize').innerText = '当前：' + e.currentTarget.value;
                    });
                    document.getElementById('S-Dark-Include').addEventListener('change', (e) => {
                        util.setValue('include_list', Array.from(new Set(e.currentTarget.value.split('\n').filter(Boolean))));
                    });
                });
            }
        },
 
        /*****************************************************************************/
 
        firstEnableDarkMode() {
            if (document.head) {
                this.isDarkMode() && this.enableDarkMode();
            }
            const headObserver = new MutationObserver(() => {
                this.isDarkMode() && this.enableDarkMode();
            });
            headObserver.observe(document.head, {childList: true, subtree: true});
 
            if (document.body) {
                this.addButton();
            } else {
                const bodyObserver = new MutationObserver(() => {
                    if (document.body) {
                        bodyObserver.disconnect();
                        this.addButton();
                    }
                });
                bodyObserver.observe(document, {childList: true, subtree: true});
            }
        },
 
        checkDarkMode() {
            const isDarkMode = window.matchMedia('(prefers-color-scheme: dark)').matches;
            console.log('Is dark mode:', isDarkMode);
            return isDarkMode;
        },
        
        /*****************************************************************************/
        init() {
            this.initValue();
            if(this.isInIncludeList()) {
                let isDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
                if (isDark) {
                    util.setValue('dark_mode', 'dark');
                } else {
                    util.setValue('dark_mode', 'light');
                }
            }
            this.setThemeColor();
            this.registerMenuCommand();
            this.addListener();
            this.firstEnableDarkMode();
           

           
            // 监听系统主题变化
            window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
                const isDarkMode = e.matches;
                // 在这里处理主题变化
                if (!this.isInIncludeList()) return;
                if (isDarkMode) {
                    util.setValue('dark_mode', 'dark');
                    this.enableDarkMode();
                } else {
                    util.setValue('dark_mode', 'light');
                    this.disableDarkMode();
                }
                this.renewButton();
            
            });
        }
    };
    main.init();
})();