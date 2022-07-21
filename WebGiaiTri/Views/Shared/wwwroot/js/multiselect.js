/*
Multi select
Author: Van Thoa
Date: 16/11/2017
*/

var _MultiSelectCallBack = {};

function MultiSelect(obj, options) {

    if (options == null) {

        if (_MultiSelectCallBack[obj] != null) {
            return _MultiSelectCallBack[obj]();
        }
        return null;
    }

    var defaultOptions = {
        "items": [],
        "max_items": 10,
        "selected": true,
        "selectedItems": null,
        "all": "All",
        "readOnly": true,
        "display_item": 2,
        "return_type": "[]",
        "return_all": false,
        "selectChange": null
    };

    if (options != null) {
        for (var key in defaultOptions) {
            if (key in options && options[key] != null) {
                defaultOptions[key] = options[key];
            }
        }
    }
    _MultiSelectCallBack[obj] = function () {
        if (self.itemSelected == defaultOptions.items.length && !defaultOptions.return_all) {
            if (defaultOptions.return_type == "[]")
                return null;
            return "";
        }
        var result = [];
        var start = (defaultOptions.all == null || defaultOptions.all == "") ? 0 : 1;
        for (var i = start; i < defaultOptions.items.length; i++) {
            if (defaultOptions.items[i].selected) {
                result.push(defaultOptions.items[i].Id);
            }
        }

        if (result.length == 0) {
            if (defaultOptions.return_type == "[]")
                return null;
            return "";
        }

        if (defaultOptions.return_type == "[]")
            return result;

        return result.join();
    };

    this.element = null;
    this.container = null;

    this.isShow = false;
    this.isClose = false;
    this.itemSelected = 0;

    this.FirstElement = null;

    var self = this;

    this.init = function () {
        this.element = $(obj);
        this.container = this.element.parents(".tselect").eq(0).find(".itemsselect").eq(0);
        
        this.addEvent();

        this.showItems();

        this.config();
    };

    this.config = function () {

        if (defaultOptions.selected && defaultOptions.all != null && defaultOptions.all != "") {
            this.element.val(defaultOptions.all);
        }

        if (defaultOptions.readOnly) {
            this.element.prop("readonly", true);
        }
    }

    this.addEvent = function () {
        this.element.on("focus", function (e) {
            e.preventDefault();
            if (!self.isShow) {
                self.show();
            }
        });

        this.element.on("blur", function (e) {
            e.preventDefault();

            self.hide();
        });
    };

    this.showItems = function () {
        this.container.html('');

        

        var numOfItemSelected = 0;
        var dataBk = [];
        for (var key in defaultOptions.items) {
            var id = defaultOptions.items[key].Id;
            
            var isSelected = false;
            if (defaultOptions.selectedItems == null || defaultOptions.selectedItems.length == 0) {
                dataBk.push({
                    Id: id,
                    Name: defaultOptions.items[key].Name,
                    selected: defaultOptions.selected
                });
                if (defaultOptions.selected == true) {
                    numOfItemSelected++;
                    isSelected = true;
                }
            } else {
                for(var item in defaultOptions.selectedItems) {
                    if (defaultOptions.selectedItems[item] == id) {
                        isSelected = true;
                        break;
                    }
                }


                dataBk.push({
                    Id: id,
                    Name: defaultOptions.items[key].Name,
                    selected: isSelected
                });
                if(isSelected == true)
                    numOfItemSelected++;
            }


            var selected = isSelected ? " class='selected' " : "";
            
            this.container.append("<li class='item' data-id='{\"id\":\"" + id + "\"}'><span" + selected + ">&check;</span>" + defaultOptions.items[key].Name + "</li>");
           
        }
        defaultOptions.items = dataBk;

        this.itemSelected = numOfItemSelected;

        if (defaultOptions.items.length > defaultOptions.max_items) {
            this.container.css("height", defaultOptions.max_items * 32);
        }

        this.FirstElement = this.container.find(".item").click(function (e) {
            e.preventDefault();
            $(this).find("span").toggleClass("selected");

            var index = $(this).index();
            if ($(this).find("span").hasClass("selected")) {
                if (index == 0 && defaultOptions.all != "") {
                    self.itemSelected = defaultOptions.items.length;
                    self.SelectAllItems(true);
                } else {
                    defaultOptions.items[index].selected = true;
                    self.itemSelected++;
                }
            } else {
                if (index == 0 && defaultOptions.all != "") {
                    self.itemSelected = 0;
                    self.SelectAllItems(false);
                } else {
                    defaultOptions.items[index].selected = false;
                    self.itemSelected--;
                    if (defaultOptions.all != "")
                        self.FirstElement.removeClass("selected");
                }
            }

            self.select();
        }).eq(0).find("span");
        this.select();
    };

    this.SelectAllItems = function (isSelected) {

        if (isSelected) {
            this.container.find(".item span").addClass("selected");
        } else {
            this.container.find(".item span").removeClass("selected");
        }

        for (var key in defaultOptions.items) {
            defaultOptions.items[key].selected = isSelected;
        }

        if (isSelected) {
            this.element.attr("title", "Tất cả");
        } else {
            this.element.attr("title", "");
        }
    };

    this.getTextItems = function () {
        var max = this.itemSelected > defaultOptions.display_item ? defaultOptions.display_item : this.itemSelected;
        max--;

        var text = "";

        var i = (defaultOptions.all == null || defaultOptions.all == "") ? 0 : 1;
        var count = 0;
        while (i < defaultOptions.items.length) {
            if (defaultOptions.items[i].selected) {
                text += defaultOptions.items[i].Name + ", ";
                if (++count > max)
                    break;
            }

            i++;


        }

        if (text != "") {
            text = text.substr(0, text.length - 2);

            if (this.itemSelected > defaultOptions.display_item) {
                text += ",...";
            }
        } else {
            text = "Chọn";
        }

        var title = "";
        for (var key in defaultOptions.items) {
            if (defaultOptions.all && defaultOptions.items[key].Id == 0)
                continue;

            if (defaultOptions.items[key].selected) {
                title += defaultOptions.items[key].Name + ", ";
            }
        }

        if (title != "") {
            title = title.substr(0, title.length - 2);
        }

        this.element.attr("title", title);
        return text;
    };

    this.select = function () {

        this.isClose = false;
        if (this.itemSelected == defaultOptions.items.length) {
            
            if (defaultOptions.all != null && defaultOptions.all != "") {
                this.element.val(defaultOptions.all);

                this.FirstElement.addClass("selected");

                this.element.attr("title", "Tất cả");
            } else {
                this.element.val(this.getTextItems());
            }
        } else {
            this.element.val(this.getTextItems());
        }

        if (defaultOptions.selectChange != null) {
            defaultOptions.selectChange(_MultiSelectCallBack[obj](), obj);
        }
    };

    this.show = function () {

        this.isShow = true;

        this.container.show();
        this.container.css({ "width": 200, "top": -200, "height": 200 });
    };

    this.hide = function () {

        this.isClose = true;

        setTimeout(function () {
            if (self.isClose) {
                self.isShow = false;
                self.container.hide();
            } else {
                self.element.focus();
            }
        }, 200);

    };

    this.reset = function (isSelected) {
        if (defaultOptions.all != "") {
            if (isSelected) {
                if (this.FirstElement.hasClass("selected") != isSelected) {
                    this.container.find(".item").eq(0).trigger("click");
                }
            } else {
                if (!this.FirstElement.hasClass("selected")) {
                    var eq = this.container.find(".item").eq(0);
                    eq.trigger("click");
                    setTimeout(function () {
                        eq.trigger("click");
                    }, 100);
                } else {
                    var eq = this.container.find(".item").eq(0);
                    eq.trigger("click");
                }
            }
        } else {

        }
    };

    this.setSelectedItems = function (selectedItems) {
        defaultOptions.selectedItems = selectedItems;
        this.showItems();
    };

    this.init();
}