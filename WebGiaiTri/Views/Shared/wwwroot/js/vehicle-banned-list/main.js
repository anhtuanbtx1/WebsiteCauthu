var table = null;
var tableHistory = null;
jQuery(document).ready(function () {

    $.fn.datepicker.defaults.language = 'vi';
    //set datepicker - Begin
    var endYear = parseInt(new Date().getFullYear()) + 1;
    $("#fromDate,#toDate,#expiryDatePicker, #expiryHistoryDatePicker,#fromActiveTime,#toActiveTime,#fromExpiryTime,#toExpiryTime,#fromBannedTime,#toBannedTime").datepicker({
        format: 'dd/mm/yyyy',
        todayBtn: "linked",
        keyboardNavigation: false,
        forceParse: false,
        calendarWeeks: true,
        autoclose: true,
        todayHighlight: true
    });

    $("#activeDatePicker").datepicker({
        format: 'dd/mm/yyyy',
        
        keyboardNavigation: false,
        forceParse: false,
        calendarWeeks: true,
        autoclose: true,
        todayHighlight: true
    });


    //$("#activeDatePicker").datepicker('setDate', new Date(_toDate));
   // $("#expiryDatePicker").datepicker('setDate', new Date(_expiryDate));

    $("#activeTimeTxt").on("focus", function (e) {
        var rect = $("#dialog-form .modal-dialog")[0].getBoundingClientRect();
        $("#activeDatePicker").css({
            top: this.getBoundingClientRect().top + rect.top + $("#dialog-form").scrollTop() - 50,
            left: this.getBoundingClientRect().left + 10
        }).show().datepicker('show');
    });

    $("#expiryTimeTxt").on("focus", function (e) {
        var rect = $("#dialog-form .modal-dialog")[0].getBoundingClientRect();
        $("#expiryDatePicker").css({
            top: this.getBoundingClientRect().top + rect.top + $("#dialog-form").scrollTop() - 35,
            left: this.getBoundingClientRect().left + 10
        }).show().datepicker('show');
    });

    $("#activeDatePicker").change(function () {
        $("#activeTimeTxt").val($(this).val());
    });

    $("#expiryDatePicker").change(function () {
        $("#expiryTimeTxt").val($(this).val());
    });

    $("#expiryHistoryTimeTxt").on("focus", function (e) {
        var rect = $("#dialog-update-history-form .modal-dialog")[0].getBoundingClientRect();
        $("#expiryHistoryDatePicker").css({
            top: this.getBoundingClientRect().top + rect.top + $("#dialog-update-history-form").scrollTop() - 35,
            left: this.getBoundingClientRect().left + 10
        }).show().datepicker('show');
    });

    $("#expiryHistoryDatePicker").change(function () {
        $("#expiryHistoryTimeTxt").val($(this).val());
    });

    $("#fromActiveTime, #toActiveTime, #fromExpiryTime, #toExpiryTime, #fromBannedTime, #toBannedTime").on("change", function () {
        if (this.value != "") {
            $(this).parent().find(".clearSearchDate").show();
        } else {
            $(this).parent().find(".clearSearchDate").hide();
        }
    });

    $(".clearSearchDate").on("click", function () {
        $(this).parent().find("input.form-control").val("").trigger("change");
    });

    //set datepicker - End

    //set timepicker - Begin
    $("#activeTimeHourTxt, #expiryTimeHourTxt, #historyExpiryTimeHourTxt").clockpicker({
        autoclose: true
    });
    $("#activeTimeHourTxt").on("change", function () {
        if (!isValidTimeString(this.value)) {
            this.value = "00:00";
        }
    });
    $("#expiryTimeHourTxt, #historyExpiryTimeHourTxt").on("change", function () {
        if (!isValidTimeString(this.value)) {
            this.value = "23:59";
        }
    });
    //set timepicker - End

    //local storage - Begin

    var myStorage = {
        set: function (key, value) {
            
        },
        get: function (key) {
            return null;
        }
    };
    if (typeof (Storage) !== "undefined") {
        myStorage.set = function (key, value) {
            localStorage.setItem(key, value);
        };

        myStorage.get = function (key, value) {
            return localStorage.getItem(key);
        };
    }
    //local storage - End

    //collapse filter - Begin
    function setCollapseFilterStatus() {
        if (!$("#collapse-filter").next().is(":visible")) {
            $("#collapse-filter").find("h5 i").attr("style", "transform: rotate(-180deg);");
            myStorage.set("collapse_filter", 1);
        } else {
            $("#collapse-filter").find("h5 i").attr("style", "transform: rotate(0deg);");
            myStorage.set("collapse_filter", "");
        }
    }
    $("#collapse-filter").on("click", function () {
        $(this).next().slideToggle(300, function () {
            setCollapseFilterStatus();
        });
    });

    if (myStorage.get("collapse_filter")) {
        $("#collapse-filter").next().hide();
        setCollapseFilterStatus();
    }
    //collapse filter - End

    //set multiselect - Begin
    var multiSelectUserOptions = {
        enableFiltering: true,
        enableCaseInsensitiveFiltering: true,
        maxHeight: 200,
        includeSelectAllOption: true,
        selectAllText: "TẤT CẢ",
        selectAllValue: -1,
        nonSelectedText: "NONE",
        nSelectedText: ' - Người dùng được chọn',
        numberDisplayed: 6,
        allSelectedText: "TẤT CẢ",
        filterPlaceholder: "Tìm kiếm người dùng",
        selectAllJustVisible: false,
        onDropdownShown: function (e) {
            var width = $(e.currentTarget).width();
            var container = $(e.currentTarget).children(".multiselect-container").eq(0);
            var filter = $(e.currentTarget).find(".multiselect-filter").eq(0);
            if (!filter.hasClass("moving")) {
                filter.addClass("moving");
                container.before(filter);
            } else {
                filter.show();
            }
            setTimeout(function () {
                if (width < 100)
                    width = 100;
                container.css({"width": width - 2 });
                filter.css("width", width);
            }, 10);
        },
        onDropdownHide: function (e) {
            var filter = $(e.currentTarget).find(".multiselect-filter").eq(0);
            filter.hide();
        }
    };

    var multiSelectGroupOptions = {
        enableFiltering: true,
        enableCaseInsensitiveFiltering: true,
        maxHeight: 200,
        includeSelectAllOption: true,
        selectAllText: "TẤT CẢ",
        selectAllValue: -1,
        nonSelectedText: "NONE",
        nSelectedText: ' - Nhóm được chọn',
        numberDisplayed: 2,
        allSelectedText: "TẤT CẢ",
        filterPlaceholder: "Tìm kiếm nhóm",
        selectAllJustVisible: false,
        onDropdownShown: function (e) {
            var width = $(e.currentTarget).width();
            var container = $(e.currentTarget).children(".multiselect-container").eq(0);
            var filter = $(e.currentTarget).find(".multiselect-filter").eq(0);
            if (!filter.hasClass("moving")) {
                filter.addClass("moving");
                container.before(filter);
            } else {
                filter.show();
            }
            setTimeout(function () {
                if (width < 100)
                    width = 100;
                container.css({"width": width - 2 });
                filter.css("width", width);
            }, 10);
        },
        onDropdownHide: function (e) {
            var filter = $(e.currentTarget).find(".multiselect-filter").eq(0);
            filter.hide();
        }
    };

    var multiSelectViolationOptions = {
        enableFiltering: true,
        enableCaseInsensitiveFiltering: true,
        includeSelectAllOption: true,
        selectAllText: "TẤT CẢ",
        selectAllValue: -1,
        nonSelectedText: "NONE",
        nSelectedText: ' - Loại vi phạm được chọn',
        numberDisplayed: 2,
        allSelectedText: "TẤT CẢ",
        filterPlaceholder: "Tìm kiếm loại vi phạm",
        selectAllJustVisible: false,
        onDropdownShown: function (e) {
            var width = $(e.currentTarget).width();
            var container = $(e.currentTarget).children(".multiselect-container").eq(0);
            var filter = $(e.currentTarget).find(".multiselect-filter").eq(0);
            if (!filter.hasClass("moving")) {
                filter.addClass("moving");
                container.before(filter);
            } else {
                filter.show();
            }
            setTimeout(function () {
                if (width < 100)
                    width = 100;
                container.css({"width": width - 2 });
                filter.css("width", width);
            }, 10);
        },
        onDropdownHide: function (e) {
            var filter = $(e.currentTarget).find(".multiselect-filter").eq(0);
            filter.hide();
        }
    };

    $("#foundBy").show().multiselect(multiSelectUserOptions);
    $("#clearBy").show().multiselect(multiSelectUserOptions);
    $("#groupUserBanned").show().multiselect(multiSelectGroupOptions);
    $("#groupUserClear").show().multiselect(multiSelectGroupOptions);
    $("#violationTypeSel").show().multiselect(multiSelectViolationOptions);
    

    var getMultiSelectVal = function (els) {
        var group = els.next(".btn-group");
        if (!group.length) {
            return -1;
        }


        var text = group.find(".multiselect.dropdown-toggle .multiselect-selected-text");
        if (!text.length) {
            return -1;
        }

        var tt = text.text();
        if (tt == "TẤT CẢ" || tt == "NONE" || tt.indexOf("TẤT CẢ (") !== -1) {
            return -1;
        }

        return $.trim(els.val());
    };
    //set multiselect - End

    //dataTables - Begin
    var tableColumnData = [
        { "data": function () { return ++index; }, 'orderable': false },
        { "data": function () { return ''; }, 'orderable': false },
        {
            "data": function (d) {
                d.truckID = formatPlateNumber(d.truckID);
                return d.truckID;
            },
            "name": "truckID"
        },
        { "data": "numOfBannedTimes" },
        { "data": "activeTime" },
        { "data": "expiryTime" },
        { "data": "violationType" },
        { "data": "reasonViolation" },
        { "data": "foundBy" },
        { "data": "bannedBy", 'orderable': false },
        {
            "data": function (d) {
                return d.siteName + " (" + d.siteId + ")";
            }, 'orderable': false
        },
        { "data": "bannedTime", 'orderable': false },
        { "data": "truckKey" },
        { "data": "ownerName" },
        { "data": "clearFlag" },
        { "data": "clearBy" },
        { "data": "clearDate" },
        { "data": "reasonClear" },
        { "data": "createdBy" },
        { "data": "createdDate" },
        { "data": "updatedDate" }
    ];

    var filterStatus = -1;
    var index = 0;
    table = $('#bannedListTable').DataTable({
        "processing": true,
        "lengthMenu": [[5, 10, 20, 30, 50, 100, -1], [5, 10, 20, 30, 50, 100, "All"]],
        "displayLength": pageLength_dataTable(),
        "orderSequence": ["desc", "asc"],
        "ajax": {
            "url": dataUrl,
            "dataType": 'json',
            "type": "POST",
            "headers": {
                "RequestVerificationToken": $("input[name='__RequestVerificationToken']").val()
            },
            error: function (e, e1, e2) {
                var msg = 'Có lỗi. Tải dữ liệu thất bại!';
                if (e && typeof e == "object" && e["responseText"]) {
                    if (e["responseText"].indexOf("Security/Login") !== -1) {
                        msg = "Vui lòng đăng nhập để tiếp tục!";
                        window.location.href = loginUrl + "?returnUrl=" + dataUrl + "&SessionEnd=True";
                    }
                }
                toastr.error(msg, "Thông báo");
                $("#jsdatatable-container").removeClass("loading");
            },
            "data": function (d) {
                delete d.columns;
                delete d.search;
                index = d.start;
                d.searchType = parseInt($.trim($('#searchType').val()));
                if (isNaN(d.searchType))
                    d.searchType = 0;
                d.searchValue = $.trim($('#searchValue').val());
                d.startDate = convertDateFormatToYYMMDD($("#fromDate").datepicker().val(), true);
                d.endDate = convertDateFormatToYYMMDD($("#toDate").datepicker().val(), true);
                d.createdBy = getMultiSelectVal($('#foundBy'));
                d.clearBy = getMultiSelectVal($('#clearBy'));
                d.groupUserCreated = getMultiSelectVal($("#groupUserBanned"));
                d.groupUserClear = getMultiSelectVal($("#groupUserClear"));
                d.dataType = dataType;
                d.orderBy = 'updatedDate';
                d.orderType = 'desc';
                d.violationTypeId = getMultiSelectVal($('#violationTypeSel'));
               
                d.status = parseInt($("#statusSel").val());
                if (isGetVehicleBannedListDeleted) d.status = 3;
                if (d.status == "0") {
                    d.fromBannedTime = convertDateFormatToYYMMDD($("#fromBannedTime").datepicker().val(), true);
                    d.toBannedTime = convertDateFormatToYYMMDD($("#toBannedTime").datepicker().val(), true);
                }
                filterStatus = d.status;

                d.fromActiveTime = convertDateFormatToYYMMDD($("#fromActiveTime").datepicker().val(), true);
                d.toActiveTime = convertDateFormatToYYMMDD($("#toActiveTime").datepicker().val(), true);
                d.fromExpiryTime = convertDateFormatToYYMMDD($("#fromExpiryTime").datepicker().val(), true);
                d.toExpiryTime = convertDateFormatToYYMMDD($("#toExpiryTime").datepicker().val(), true);
                if (d.order != null && d.order.length > 0 && d.order[0].column != 0) {
                    if (tableColumnData.length > d.order[0].column) {
                        var column = tableColumnData[d.order[0].column];
                        if (column != null) {
                            if (typeof column.data == 'string')
                                d.orderBy = column.data;
                            else
                                d.orderBy = column.name;

                            d.orderType = d.order[0].dir;
                        }
                    }

                    delete d.order;
                }

                if (d.searchValue != null && d.searchValue != "") {
                    $("#clearSearchText").show();
                } else {
                    $("#clearSearchText").hide();
                }

                $("#bannedListTable tbody").html('<td colspan="15">Đang tải...</td>');
                $("#jsdatatable-container").addClass("loading");

                $("#searchBtn").prop("disabled", true).html("Đang tải...");
            }
        },
        "serverSide": true,
        "searching": false,
        "ordering": true,
        "scrollX": true,
        "scrollY": true,
        "autoWidth": false,
        "oLanguage": {
            "sProcessing": "Đang xử lý...",
            "sLengthMenu": "Xem _MENU_ mục",
            "sZeroRecords": "Không tìm thấy dòng nào phù hợp",
            "sInfo": "Đang xem _START_ đến _END_ trong tổng số _TOTAL_ mục",
            "sInfoEmpty": "Đang xem 0 đến 0 trong tổng số 0 mục",
            "sInfoFiltered": "(được lọc từ _MAX_ mục)",
            "oPaginate": {
                "sFirst": "Đầu",
                "sPrevious": "Trước",
                "sNext": "Tiếp",
                "sLast": "Cuối"
            }
        },
        dom: '<"html5buttons"B>lTTfgitp',
        buttons: [
            'copyHtml5',
            {
                'extend': 'excelHtml5',
                'title': 'Danh sách xe cấm vào ra',
                'filename': getExportFileName(),
                'exportOptions': {
                    columns: ':not(.not-export)',
                }
            },
            {
                'extend': 'csvHtml5',
                'title': 'Danh sách xe cấm vào ra',
                'charset': 'UTF-8',
                'bom': true,
                'filename': getExportFileName(),
                'exportOptions': {
                    columns: ':not(.not-export)'
                }
            },
            {
                'extend': 'pdfHtml5',
                'title': 'Danh sách xe cấm vào ra',
                'orientation': 'landscape',
                'pageSize': 'LEGAL',
                'filename': getExportFileName(),
                'exportOptions': {
                    columns: ':not(.not-export)'
                }
            }
        ],
        "fixedHeader": {
            "header": false,
            "footer": false
        },
        "columnDefs": [
            { "width": "40px", "targets": 0 },
            {
                "width": "190px",
                "targets": 1,
                "render": function (data, type, row) {
                    if (isGetVehicleBannedListDeleted) {
                        return '';
                        isGetVehicleBannedListDeleted = false;
                    }
                    var buttonsHtml = '';
                    if (filterStatus != 2) { //status 2 => Filter dữ liệu đã xóa
                        if (isHasEditRole == "true")
                            buttonsHtml += '<a href="#" onclick="return update(' + row.id + ')">Sửa</a> &nbsp; - &nbsp;';
                        if (isHasDeleteRole == "true")
                            buttonsHtml += '<a class="delete" href="#" onclick="return deleteRow(this, ' + row.id + ')">Xóa</a> &nbsp; - &nbsp;';
                    } else {
                        buttonsHtml += '<a href="#" onclick="return restore(' + row.id + ')" title="Xóa vĩnh viễn">Khôi phục</a> &nbsp; - &nbsp;';
                    }
                    buttonsHtml += '<a href="#" style="color: #006a55" onclick="return showDetail(' + row.id + ')">Chi tiết</a> &nbsp;';
                    if (row.isValidBanned) {
                        if (row.isHasClearRole)
                            buttonsHtml += ' - &nbsp;<a href="#" onclick="return clearRow(' + row.id + ')">Hủy</a>';
                    }
                    else {
                        if (row.isHasForbidRole)
                            buttonsHtml += ' - &nbsp;<a href="#" onclick="return update(' + row.id + ', true)">Cấm</a>';
                    }
                    return buttonsHtml;
                }
            },
            { "width": "100px", "targets": 2 },
            { "width": "100px", "targets": 3 },
            { "width": "150px", "targets": 4 },
            { "width": "150px", "targets": 5 },
            { "width": "250px", "targets": 6 },
            {
                "width": "200px",
                "targets": 7,
                "render": function (data, type, row) {
                    if (data != null && data.length > 45) {
                        return data.substr(0, 45) + "... <a href='#' onclick='return readMore(this)'>Xem thêm</a><span style='display: none'>" + data + "</span>";
                    }
                    return data;
                }
            },
            { "width": "180px", "targets": 8 },
            { "width": "180px", "targets": 9 },
            { "width": "200px", "targets": 10 },
            { "width": "120px", "targets": 11 },
            { "width": "120px", "targets": 12 },
            { "width": "120px", "targets": 13 },
            { "width": "110px", "targets": 14 },
            { "width": "150px", "targets": 15 },
            { "width": "150px", "targets": 16 },
            {
                "width": "200px",
                "targets": 17,
                "render": function (data, type, row) {
                    if (data != null && data.length > 45) {
                        return data.substr(0, 45) + "... <a href='#' onclick='return readMore(this)'>Xem thêm</a><span style='display: none'>" + data + "</span>";
                    }
                    return data;
                }
            },
            { "width": "180px", "targets": 18 },
            { "width": "120px", "targets": 19 },
            { "width": "120px", "targets": 20 },
        ],
        "fixedColumns": true,
        "columns": tableColumnData,
        'fnDrawCallback': function (oSettings) {
            __idUpdate = -1;
            $(".html5buttons .dt-buttons").addClass("btn-group");
            $(".html5buttons .dt-button").addClass("btn btn-default");
            $("#searchBtn").prop("disabled", false).html("Lọc danh sách");
            $("#bannedListTable_wrapper table.dataTable thead th.not-export").removeClass("sorting_asc").addClass("sorting_disabled");
            $("#jsdatatable-container").removeClass("loading");

            if (isSearchPlateInUrl) {
                isSearchPlateInUrl = false;
                var lastRow = table.row(':last').data();
                if (lastRow && typeof lastRow == 'object') {
                    showDetail(lastRow.id);
                }
            }
        },
        'createdRow': function (row, data) {
            if (data.isValidBanned == true)
                $(row).addClass("banned");
            if (__idUpdate != -1 && __idUpdate == data.id) {
                hightLightUpdateRow(row);
                __idUpdate = -1;
            }
        }
    });

    var isValidSearchValue = function () {
        var fromActiveTime = $("#fromActiveTime").val();
        var toActiveTime = $("#toActiveTime").val();
        if (fromActiveTime != "" && toActiveTime == "") {
            toastr.error("Vui lòng chọn đến ngày thực hiện cấm");
            return false;
        }

        if (fromActiveTime != "") {
            var dateTime = convertDateFormatToYYMMDD(fromActiveTime, true);
            if (dateTime == null) {
                toastr.error("Ngày thực hiện cấm không hợp lệ");
            }
        }

        if (fromActiveTime == "" && toActiveTime != "") {
            toastr.error("Vui lòng chọn từ ngày thực hiện cấm");
            return false;
        }

        if (toActiveTime != "") {
            var dateTime = convertDateFormatToYYMMDD(toActiveTime, true);
            if (dateTime == null) {
                toastr.error("Ngày thực hiện cấm không hợp lệ");
            }
        }

        var fromExpiryTime = $("#fromExpiryTime").val();
        var toExpiryTime = $("#toExpiryTime").val();

        if (fromExpiryTime != "" && toExpiryTime == "") {
            toastr.error("Vui lòng chọn đến ngày hết hạn cấm");
            return false;
        }

        if (fromExpiryTime != "") {
            var dateTime = convertDateFormatToYYMMDD(fromExpiryTime, true);
            if (dateTime == null) {
                toastr.error("Ngày hết hạn cấm không hợp lệ");
            }
        }

        if (fromExpiryTime == "" && toExpiryTime != "") {
            toastr.error("Vui lòng chọn từ ngày hết hạn cấm");
            return false;
        }

        if (toExpiryTime != "") {
            var dateTime = convertDateFormatToYYMMDD(toExpiryTime, true);
            if (dateTime == null) {
                toastr.error("Ngày hết hạn cấm không hợp lệ");
            }
        }

        return true;
    };

    $("#searchBtn").on('click', function () {
        if (isValidSearchValue()) {
            table.draw();
        }
    });

    $("#searchValue").on("keydown", function (e) {
        if (e.keyCode == 13)
            table.draw();
    });
    //dataTables - End

    //add new - Begin
    $("#addNew").on("click", addNew);
    //add new - End

    //event - Begin
    $("#clearBannedListSaveBtn").on('click', clearBannedList);
    $("#clearSearchText").on('click', function () {
        $('#searchValue').val('');
        table.draw();
    });
    //event - End

    //import - Begin
    $("#importExcel").on("click", importExcel);
    //import - End

    var isSelectBannedTime = false;
    var timerSelectedBannedTime = null;
    var inBannedTimeBox = $("#inBannedTimeBox");
    $("#statusSel").on("change", function () {
        if (this.value == "0") {
            isSelectBannedTime = true;
            inBannedTimeBox.show();
        } else {
            isSelectBannedTime = false;
            clearInterval(timerSelectedBannedTime);
            inBannedTimeBox.hide();
        }
    });

    $("#statusSel-container").hover(function () {
        if (isSelectBannedTime) {
            clearInterval(timerSelectedBannedTime);
            inBannedTimeBox.show();
        }
    }, function () {
            if (isSelectBannedTime) {
                clearInterval(timerSelectedBannedTime);
                var dpicker = $(".datepicker.datepicker-dropdown");
                if (!dpicker.is(":visible")) {
                    inBannedTimeBox.hide();
                } else {
                    timerSelectedBannedTime = setInterval(function () {
                        if (!dpicker.is(":visible")) {
                            clearInterval(timerSelectedBannedTime);
                            inBannedTimeBox.hide();
                        }
                    }, 500);
                }
            }
    });
});

function formatPlateNumber(plateNumber) {
    if (!plateNumber || plateNumber.length < 5) return plateNumber;

    var first = plateNumber.substr(0, 4);
    var last = plateNumber.substr(4);
    if (last.length > 4) {
        last = last.substr(0, 3) + "." + last.substr(3);
    }
    return first + "-" + last;
}

function isValidTimeString(timestr) {
    var times = timestr.split(":");
    if (times.length != 2)
        return false;
    var hours = $.trim(times[0]);
    var minutes = $.trim(times[1]);
    var h = parseInt(hours);
    if (isNaN(h) || h < 0 || h > 23)
        return false;
    var m = parseInt(minutes);
    if (isNaN(m) || m < 0 || m > 59)
        return false;
    return true;
};

function readMore(els) {
    els = $(els).parent()
    var html = els.children("span").html();
    els.html(html);
    return false;
}

function hightLightUpdateRow(row) {
    var count = 0;
    var timer = setInterval(function () {
        if (count % 2 == 0) {
            $(row).addClass("hight-light");
        } else {
            $(row).removeClass("hight-light");
        }
        count++;
        if (count == 10) {
            clearInterval(timer);
            $(row).removeClass("hight-light");
        }
    }, 200);
   
}

function restore(id) {

}

var dialogImport = null;
function importExcel(e) {
    e.preventDefault();
    e.stopPropagation();
    if (dialogImport == null) {
        dialogImport = $("#modal-import");
        dialogImport.on("shown.bs.modal", function () {
            $("#importBtn").prop("disabled", true);
        });

        dialogImport.on("hidden.bs.modal", function () {
            if ($("#importFile")[0].files.length > 0) {
                $("#importFile")[0].value = "";
            }
        });

        $("#importFile").on("change", function () {
            if (this.files.length > 0) {
                if (!isExcelFile(this.files[0])) {
                    toastr.error('Vui lòng chọn file excel(*.xlsx)');
                    this.value = "";
                    return false;
                }

                $("#importBtn").prop("disabled", false);
            }
        });

        $("#importBtn").on("click", function () {
            var files = document.getElementById("importFile").files;
            if (files.length > 0) {

                var formData = new FormData();
                formData.append("file", files[0]);

                $("#importBtn").prop("disabled", true);
                $.ajax({
                    url: baseUrl + "/ImportVehicleList?dataType=" + dataType,
                    data: formData,
                    processData: false,
                    contentType: false,
                    type: "POST",
                    headers: {
                        RequestVerificationToken: $("input[name='__RequestVerificationToken']").val()
                    },
                    success: function (data) {
                        if (data.success) {
                            toastr.success('Import thành công ' + data.numOfImportSuccess + '/' + data.totalImport);
                            dialogImport.modal('hide');
                            table.draw();
                        } else {
                            toastr.error('Import thất bại');
                        }
                        $("#importBtn").prop("disabled", true);
                    },
                    error: function (e, e1, e2) {
                        var msg = 'Có lỗi. Import thất bại!';
                        if (e && typeof e == "object" && e["responseText"]) {
                            if (e["responseText"].indexOf("Security/Login") !== -1) {
                                msg = "Vui lòng đăng nhập để tiếp tục!";
                                window.location.href = loginUrl + "?returnUrl=" + dataUrl + "&SessionEnd=True";
                            }
                        }
                        toastr.error(msg, "Thông báo");

                        $("#importBtn").prop("disabled", false);
                    }
                });
            }
        });
    }

    dialogImport.modal("show");
    return false;
}

function isExcelFile(file) {
    if (file.type.indexOf("application/vnd") === -1)
        return false;

    var arrSplit = file.name.split('.');
    var fileExt = arrSplit[arrSplit.length - 1];
    if (fileExt != "xlsx")
        return false;

    return true;
}

function validateCharacterLimit(data) {
    if ($.trim(data.truckID).length > 50) {
        toastr.error("Chiều dài biển số xe tối đa 50 ký tự, vui lòng nhập lại!")
        return false;
    }

    if ($.trim(data.truckKey).length > 50) {
        toastr.error("Chiều dài số cavet tối đa 50 ký tự, vui lòng nhập lại!")
        return false;
    }

    if ($.trim(data.reasonViolation).length > 4000) {
        toastr.error("Chiều dài lý do vi phạm tối đa 4000 ký tự, vui lòng nhập lại!")
        return false;
    }

    if ($.trim(data.foundBy).length > 256) {
        toastr.error("Chiều dài người phát hiện tối đa 256 ký tự, vui lòng nhập lại!")
        return false;
    }

    return true;
}

var dialog = null;
var onSaveForm = null;
var curIdUpdate = 0;
var isNeedUpdateDataTable = false;
var isInsertMode = true;

function enterInfo(isInsert) {
    isInsertMode = isInsert; //Banned
    if (dialog == null) {
        dialog = $("#dialog-form").modal('show');
        dialog.on('shown.bs.modal', function () {
            dialog.find('input[name="truckID"]').focus();
            isModalOpen = true;
        });
        dialog.on('hidden.bs.modal', function () {
            if (isNeedUpdateDataTable) {
                table.draw(false);
                isNeedUpdateDataTable = false;
            }

            onHideAutoComplete();
            onModalClose();
        });

        dialog.on('hide.bs.modal', function () {
            $(".datePickeModal").hide();
        });

        $("#infoForm").on("submit", function () {
            var formData = getFormData("#infoForm .form-control");
            if (formData == null)
                return false;

            if (!validateCharacterLimit(formData))
                return false;

            $("#saveDialogForm").prop('disabled', true);
            onSaveForm(formData);
            
            return false;
        });

        var isPlateNumber = function (text) {
            if (text.length > 1) {
                return true;
            }
            return false;
        }

        var autoCompletBox = $("#plateNumberAutoComplateBox");
        var autoCompleteLoader = $("#autoCompleteLoader");

        var isAutoCompleteBoxShowing = true;
        var isSelectedByMouseHover = false;
        var autoCompleteItemIndex = -1;
        var numOfPlateNumberItem = 3;
        var moveTop = function() {
            if (isAutoCompleteBoxShowing) {
                if (autoCompleteItemIndex == 0) {
                    autoCompleteItemIndex = -1;
                } else if (autoCompleteItemIndex == -1) {
                    autoCompleteItemIndex = numOfPlateNumberItem - 1;
                } else {
                    autoCompleteItemIndex--;
                }

                isSelectedByMouseHover = false;
                autoCompletBox.children("li.active").removeClass("active");
                if (autoCompleteItemIndex != -1)
                    autoCompletBox.children("li").eq(autoCompleteItemIndex).addClass("active");
            }
        }

        var moveBottom = function() {
            if (isAutoCompleteBoxShowing) {
                if (autoCompleteItemIndex == numOfPlateNumberItem - 1) {
                    autoCompleteItemIndex = -1;
                } else {
                    autoCompleteItemIndex++;
                }

                isSelectedByMouseHover = false;
                autoCompletBox.children("li.active").removeClass("active");
                if (autoCompleteItemIndex != -1)
                    autoCompletBox.children("li").eq(autoCompleteItemIndex).addClass("active");
            }
        }

        var onEnter = function () {
            if (isInsertMode && isAutoCompleteBoxShowing) {
                if (autoCompleteItemIndex != -1) {
                    var els = autoCompletBox.children("li").eq(autoCompleteItemIndex);
                    onSelectedPlateNumber($.trim(els.attr("data-plate")), els.attr("data-id"));
                    onHideAutoComplete();
                } else {
                    if (numOfPlateNumberItem == 1) {
                        var els = autoCompletBox.children("li").eq(0);
                        onSelectedPlateNumber($.trim(els.attr("data-plate")), els.attr("data-id"));
                        onHideAutoComplete();
                    } else {
                        onHideAutoComplete();
                    }
                }
            }
        };

        var autoComplateData = [];
        var fullAutoCompleteData = [];
        var limitAutoCompleteData = function (maxLength) {
            if (autoComplateData.length > maxLength) {
                var data = [];
                var chPlateNumber = plateNumber.split('');
                for (var key in autoComplateData) {
                    var numOfMatcher = 0;
                    var ch = autoComplateData[key].plateNumber.split('');
                    for (var k in ch) {
                        if (chPlateNumber.indexOf(ch[k]) !== -1) {
                            numOfMatcher++;
                        }
                    }
                    autoComplateData[key].numOfMatcher = numOfMatcher;
                    data.push(autoComplateData[key])
                }

                for (var i = 0; i < data.length; i++) {
                    for (var j = i + 1; j < data.length; j++) {
                        if (data[i].numOfMatcher < data[j].numOfMatcher) {
                            var temp = data[i];
                            data[i] = data[j];
                            data[j] = temp;
                        }
                    }
                }

                var tempData = data;
                data = [];
                for (var i = 0; i < maxLength; i++) {
                    data.push(tempData[i]);
                }

                return data;
            }

            return autoComplateData;
        }

        var onShowAutoComplete = function () {
            if (autoComplateData.length > 0) {
                autoCompleteItemIndex = -1;
                autoComplateData = limitAutoCompleteData(10);
                numOfPlateNumberItem = autoComplateData.length;

                autoCompletBox.html("");
                for (var key in autoComplateData) {
                    var text = autoComplateData[key].plateNumber;
                    if (autoComplateData[key].ownerName) {
                        text += " (" + autoComplateData[key].ownerName + ")";
                    }
                    autoCompletBox.append($("<li>").
                        attr("data-id", autoComplateData[key].id).
                        attr("data-plate", autoComplateData[key].plateNumber).
                        html(text));
                }

                if ($("#truckIDInput").is(":focus")) {
                    isAutoCompleteBoxShowing = true;
                    autoCompletBox.show();
                } else {
                    onHideAutoComplete();
                }
            }
        };

        var onHideAutoComplete = function () {
            isAutoCompleteBoxShowing = false;
            autoCompletBox.hide();
            autoCompleteLoader.hide();
        };

        var searchPlateNumber = function () {
            autoCompleteLoader.show();
            $.ajax({
                url: baseUrl + "/SearchPlateNumber",
                type: "POST",
                data: { plateNumber: plateNumber },
                dataType: 'json',
                headers: {
                    RequestVerificationToken: $("input[name='__RequestVerificationToken']").val()
                },
                success: function (data) {
                    autoCompleteLoader.hide();
                    if (data.length > 0) {
                        autoComplateData = data;
                        fullAutoCompleteData = data;
                        onShowAutoComplete();
                    } else {
                        onHideAutoComplete();
                    }
                },
                error: function (e, e1, e2) {
                    if (e && typeof e == "object" && e["responseText"]) {
                        if (e["responseText"].indexOf("Security/Login") !== -1) {
                            window.location.href = loginUrl + "?returnUrl=" + dataUrl + "&SessionEnd=True";
                        }
                    }
                    autoCompleteLoader.hide();
                }
            });
        };

        var timer = null;
        var plateNumber = null;
        var oldPlateNumber = '';
        var selectPlateNumber = '';
        var selectPlateNumberByUser = '';

        var autoCompletePlateNumber = function (_plateNumber) {
            plateNumber = $.trim(_plateNumber).replace(/(\.|-| )/gi, "");
            if (oldPlateNumber == plateNumber)
                return true;

            oldPlateNumber = plateNumber;
            clearTimeout(timer);
            if (plateNumber != "") {
                autoCompleteLoader.show();
                timer = setTimeout(function () {
                    if (isPlateNumber(plateNumber)) {
                        searchPlateNumber();
                    } else {
                        autoCompleteLoader.hide();
                    }
                }, 500);
            } else {
                autoComplateData = [];
                fullAutoCompleteData = [];
                onHideAutoComplete();
            }
        };

        var loadEditBannedList = function (id) {
            if (isInsertMode) {
                var item = findVehicleBannedListById(id);
                if (item != null) {
                    if (isModalOpen) {
                        dialog.modal("hide");

                        setTimeout(function () {
                            showUpdateModal(item, id, false, true);
                        }, 500);
                    }
                } else {

                    $.ajax({
                        url: baseUrl + "/GetVehicleBannedListInfo",
                        type: "POST",
                        data: { id: id },
                        dataType: 'json',
                        headers: {
                            RequestVerificationToken: $("input[name='__RequestVerificationToken']").val()
                        },
                        success: function (data) {
                            if (isModalOpen) {
                                dialog.modal("hide");
                                if (data) {
                                    setTimeout(function () {
                                        showUpdateModal(data, id, false, true);
                                    }, 500);
                                } else {
                                    toastr.error("Không tìm thấy thông tin xe bị cấm!");
                                }
                            }
                        },
                        error: function (e, e1, e2) {
                            if (e && typeof e == "object" && e["responseText"]) {
                                if (e["responseText"].indexOf("Security/Login") !== -1) {
                                    window.location.href = loginUrl + "?returnUrl=" + dataUrl + "&SessionEnd=True";
                                }
                            }

                            toastr.error("Không tìm thấy thông tin xe bị cấm!");
                            dialog.modal('hide');
                        }
                    });
                }
            }
        };

        var onSelectedPlateNumber = function (_plateNumber, id) {
            if (isInsertMode) {
                selectPlateNumber = _plateNumber.replace(/(\.|-| )/gi, "").toUpperCase();
                selectPlateNumberByUser = selectPlateNumber;
                $("#infoForm #truckIDInput").val(_plateNumber);
                loadEditBannedList(id);
            }
        };

        var isModalOpen = true;
        var onModalClose = function () {
            isModalOpen = false;
            selectPlateNumber = '';
            oldPlateNumber = '';
            autoComplateData = [];
            fullAutoCompleteData = [];
        };

        var onBlur = function () {
            var p = $.trim($("#infoForm #truckIDInput").val()).replace(/(\.|-| )/gi, "").toUpperCase();
            if (selectPlateNumber != p) {
                selectPlateNumber = p;
                if (selectPlateNumber == "")
                    return;

                if (fullAutoCompleteData.length > 0) {
                    var id = -1;
                    for (var key in fullAutoCompleteData) {
                        var pp = fullAutoCompleteData[key].plateNumber.replace(/(\.|-| )/gi, "").toUpperCase();
                        if (pp == selectPlateNumber) {
                            id = fullAutoCompleteData[key].id;
                            break;
                        }
                    }
                    if (id !== -1) {
                        selectPlateNumberByUser = selectPlateNumber;
                        loadEditBannedList(id);
                        return true;
                    }
                }

                var item = findVehicleBannedListByPlateNumber(selectPlateNumber);
                if (item) {
                    selectPlateNumberByUser = selectPlateNumber;
                    loadEditBannedList(item.id);
                    return;
                }

                autoCompleteLoader.show();

                $.ajax({
                    url: baseUrl + "/FindBannedIdByPlateNumber",
                    type: "POST",
                    data: { plateNumber: selectPlateNumber },
                    dataType: 'json',
                    headers: {
                        RequestVerificationToken: $("input[name='__RequestVerificationToken']").val()
                    },
                    success: function (data) {
                        autoCompleteLoader.hide();
                        if (data != -1) {
                            selectPlateNumberByUser = selectPlateNumber;
                            loadEditBannedList(data);
                        }
                        //alert(data);
                    },
                    error: function (e, e1, e2) {
                        if (e && typeof e == "object" && e["responseText"]) {
                            if (e["responseText"].indexOf("Security/Login") !== -1) {
                                window.location.href = loginUrl + "?returnUrl=" + dataUrl + "&SessionEnd=True";
                            }
                        }
                        autoCompleteLoader.hide();
                    }
                });
            }
        };

        autoCompletBox.on("mouseenter", "li", function () {
            autoCompletBox.children("li.active").removeClass("active");
            autoCompleteItemIndex = $(this).index();
            if (autoCompleteItemIndex != -1) {
                isSelectedByMouseHover = true;
                $(this).addClass("active");
            }
        });

        autoCompletBox.on("mouseleave", function () {
            if (isInsertMode && isSelectedByMouseHover) {
                isSelectedByMouseHover = false;
                autoCompleteItemIndex = -1;
                autoCompletBox.children("li.active").removeClass("active");
            }
        });

        autoCompletBox.on("click", "li", function () {
            onSelectedPlateNumber($.trim($(this).attr("data-plate")), $(this).attr("data-id"));
        });

        $("#infoForm #truckIDInput").on("keyup", function (e) {
            if (isInsertMode) {
                if (e.keyCode == 38) {
                    moveTop();
                } if (e.keyCode == 40) {
                    moveBottom();
                } if (e.keyCode == 13) {
                    onEnter();
                } else {
                    autoCompletePlateNumber(this.value);
                }
            }
        }).on("drop", function () {
            if (isInsertMode) {
                var self = this;
                setTimeout(function () {
                    autoCompletePlateNumber(self.value);
                }, 1);
            }
        }).on("paste", function () {
            if (isInsertMode) {
                var self = this;
                setTimeout(function () {
                    autoCompletePlateNumber(self.value);
                }, 1);
            }
        }).on("focus", function () {
            if (isInsertMode && $.trim(this.value) != "") {
                if (this.value.replace(/(\.|-| )/gi, "").toUpperCase() != selectPlateNumberByUser) {
                    onShowAutoComplete();
                }
            }
        }).on("blur", function () {
            if (isInsertMode) {
                setTimeout(function () {
                    if (isAutoCompleteBoxShowing) {
                        onHideAutoComplete();
                    }
                    onBlur();
                }, 300);
            }
        });

        $("#saveDialogForm").on("click", function () {
            $("#infoForm").submit();
        });
    }

    isNeedUpdateDataTable = false;
    $("#success-message").hide();
    clearFormError('#infoForm');
    dialog.modal("show");
}

function addNew(e) {
    e.preventDefault();
    e.stopPropagation();

    __idUpdate = -1;
    onSaveForm = function (data, isCloseForm) {
        data["activeTime"] += " " + $.trim($("#activeTimeHourTxt").val()) + ":00";
        data["expiryTime"] += " " + $.trim($("#expiryTimeHourTxt").val()) + ":59";
        data["dataType"] = dataType;
        data["violationTypeId"] = data.bannedType;
        $.ajax({
            method: "POST",
            url: baseUrl + '/CreateVehicleBannedList',
            dataType: "json",
            headers: {
                RequestVerificationToken: $("input[name='__RequestVerificationToken']").val()
            },
            data: data
        }).done(function (res) {
            $("#saveDialogForm").prop('disabled', false);
            if (res.success) {
                isNeedUpdateDataTable = true;
                toastr.success('Thêm thành công!', 'Thông báo');

                if (isCloseForm != null) {
                    clearFormText('#infoForm');
                    dialog.modal("hide");
                }
                else {
                    clearFormError('#infoForm');
                    clearFormText('#infoForm');
                    $("#bannedTypeSel").val(data.bannedType);
                    $("#expiryTimeHourTxt").val("23:59");
                    $("#activeTimeHourTxt").val("00:00");
                }
            } else {
                toastr.error(res.message, 'Thông báo');
            }
        }).fail(function (e, e1, e2) {
            var msg = 'Có lỗi. Thêm thất bại!';
            if (e && typeof e == "object" && e["responseText"]) {
                if (e["responseText"].indexOf("Security/Login") !== -1) {
                    msg = "Vui lòng đăng nhập để tiếp tục!";
                    window.location.href = loginUrl + "?returnUrl=" + dataUrl + "&SessionEnd=True"; 
                }
            }
            toastr.error(msg, "Thông báo");
            $("#saveDialogForm").prop('disabled', false);
        });
    };

    clearFormText('#infoForm');
    var firstBannedIndex = $("#bannedTypeSel option:eq(0)").attr("value");
    $("#bannedTypeSel").val(firstBannedIndex);
    $("#expiryTimeHourTxt").val("23:59");
    $("#activeTimeHourTxt").val("00:00");

    $("#dialog-form .modal-title").html('Thêm xe cấm vào ra');
    $("#infoForm .info-row").show();
    $("#infoForm .banned-row").show();
    enterInfo(true);
    return false;
}

var __idUpdate = -1;
function update(id, haveBannedAgain) {
    var item = findVehicleBannedListById(id);
    if (item == null) {
        toastr.error("Không tìm thấy thông tin xe vi phạm cần sửa!");
        return false;
    }

    if (haveBannedAgain && (!item.isHasForbidRole || item.isValidBanned)) {
        toastr.error("Không tìm thấy thông tin xe vi phạm cần sửa!");
        return false;
    }

    showUpdateModal(item, id, haveBannedAgain);
    return false;
}

var __haveBannedAgain = false;
function showUpdateModal(item, id, haveBannedAgain, isEditByFromAdd) {
    __idUpdate = id;
    __haveBannedAgain = haveBannedAgain || isEditByFromAdd;
    onSaveForm = function (data, isCloseForm) {
        data["activeTime"] += " " + $.trim($("#activeTimeHourTxt").val()) + ":00";
        data["expiryTime"] += " " + $.trim($("#expiryTimeHourTxt").val()) + ":59";
        data["id"] = curIdUpdate;
        data["violationTypeId"] = data.bannedType;
        if (__haveBannedAgain)
            data["haveBannedAgain"] = true;
        $.ajax({
            method: "POST",
            url: baseUrl + "/UpdateVehicleBannedList",
            dataType: "json",
            headers: {
                RequestVerificationToken: $("input[name='__RequestVerificationToken']").val()
            },
            data: data
        }).done(function (res) {
            $("#saveDialogForm").prop('disabled', false);
            if (res.success) {
                isNeedUpdateDataTable = true;
                toastr.success('Cập nhật thành công!', 'Thông báo');

                dialog.modal("hide");
            } else {
                toastr.error(res.message, 'Thông báo');
            }
        }).fail(function (e, e1, e2) {
            var msg = 'Có lỗi. Cập nhật thất bại!';
            if (e && typeof e == "object" && e["responseText"]) {
                if (e["responseText"].indexOf("Security/Login") !== -1) {
                    msg = "Vui lòng đăng nhập để tiếp tục!";
                    window.location.href = loginUrl + "?returnUrl=" + dataUrl + "&SessionEnd=True";
                }
            }
            toastr.error(msg, "Thông báo");
            $("#saveDialogForm").prop('disabled', false);
        });
    };

    curIdUpdate = id;
    if (__haveBannedAgain) {
        setFormData("#infoForm .form-control", item, ["reasonViolation", "foundBy", "note"]);
        $("#dialog-form .modal-title").html('Cấm xe vào ra - ' + item.truckID);
        setTimeout(function () {
            dialog.find('textarea[name="reasonViolation"]').focus();
        }, 500);
    }
    else {
        setFormData("#infoForm .form-control", item);
        $("#dialog-form .modal-title").html('Cập nhật xe cấm vào ra');
    }

    if (!__haveBannedAgain) {
        $("#infoForm .info-row").show();
        $("#infoForm .banned-row").hide();
    } else {
        $("#infoForm .info-row").hide();
        $("#infoForm .banned-row").show();
    }

    if (__haveBannedAgain) {
        $("#activeDatePicker").datepicker('setDate', new Date(_toDate));
        $("#expiryDatePicker").datepicker('setDate', new Date(_expiryDate));
        $("#activeTimeHourTxt").val("00:00");
        $("#expiryTimeHourTxt").val("23:59");
    }
    enterInfo(false);
}

function deleteBannedList() {
    $("#modal-confirm").modal('hide');
    $.ajax({
        method: "POST",
        url: baseUrl + '/DeleteVehicleBannedList',
        headers: {
            RequestVerificationToken: $("input[name='__RequestVerificationToken']").val()
        },
        data: { id: curBannedIdDelete }
    }).done(function (res) {
        if (res.success) {
            $(curBannedElementDelete).parent().parent().fadeOut('slow', function () {
                $(this).remove();
                var index = 0;
                $("#bannedListTable tbody tr").each(function () {
                    $(this).find("td").eq(0).text((++index) + "");
                });
            });
            toastr.success('Xóa thành công!', 'Thông báo');
            
        } else {
            toastr.error(res.message, 'Thông báo');
        }
    }).fail(function (e, e1, e2) {
        var msg = 'Có lỗi. Xóa thất bại!';
        if (e && typeof e == "object" && e["responseText"]) {
            if (e["responseText"].indexOf("Security/Login") !== -1) {
                msg = "Vui lòng đăng nhập để tiếp tục!";
                window.location.href = loginUrl + "?returnUrl=" + dataUrl + "&SessionEnd=True";
            }
        }
        toastr.error(msg, "Thông báo");
    });
}

var __clearRowHistoryId = false;
var dialogUnBanned = null;
function clearRow(id, historyId) {
    var item = findVehicleBannedListById(id);
    if (item == null || !item.isHasClearRole || !item.isValidBanned) {
        toastr.error("Không tìm thấy thông tin xe vi phạm!");
        return;
    }
    __idUpdate = id;
    __clearRowHistoryId = historyId;
    curIdUpdate = id;
    if (dialogUnBanned == null) {
        dialogUnBanned = $("#dialog-unbanned-form");
        dialogUnBanned.on('shown.bs.modal', function () {
            dialogUnBanned.find('textarea[name="reasonClear"]').focus();
            if (__clearRowHistoryId)
                $("#modal-detail").css("opacity", 0.5);
        });
        dialogUnBanned.on("hidden.bs.modal", function () {
            if (isNeedUpdateDataTable == true) {
                table.draw(false);
                isNeedUpdateDataTable = false;
            }

            if (__clearRowHistoryId) {
                $(document.body).addClass("modal-open");
                $("#modal-detail").css("opacity", 1);
            }
            __clearRowHistoryId = false;
        });

        $("#dialog-unbanned-form form").on("submit", function () {
            return false;
        });
    }

    $("#dialog-unbanned-form .modal-title").text("Hủy cấm xe vào ra - " + item.truckID);
    isNeedUpdateDataTable = false;
    dialogUnBanned.modal('show');
    return false;
}

function clearBannedList() {
    var formData = getFormData("#dialog-unbanned-form .form-control");
    if (formData == null)
        return false;

    var self = $(this);
    self.prop("disabled", true);
    formData["vehicleBannedListId"] = curIdUpdate;
    if (__clearRowHistoryId)
        formData["bannedHistoryId"] = __clearRowHistoryId;
    $.ajax({
        method: "POST",
        url: baseUrl + "/ClearVehicleBannedList",
        dataType: "json",
        headers: {
            RequestVerificationToken: $("input[name='__RequestVerificationToken']").val()
        },
        data: formData
    }).done(function (res) {
        self.prop("disabled", false);
        if (res.success) {
            isNeedUpdateDataTable = true;
            if (__clearRowHistoryId)
                tableHistory.draw();
            clearFormText('#dialog-unbanned-form');
            dialogUnBanned.modal("hide");
            toastr.success('Hủy cấm thành công!', 'Thông báo');
        } else {
            toastr.error(res.message, 'Thông báo');
        }
    }).fail(function (e) {
        self.prop("disabled", false);
        var msg = 'Có lỗi. Hủy cấm thất bại!';
        if (e && typeof e == "object" && e["responseText"]) {
            if (e["responseText"].indexOf("Security/Login") !== -1) {
                msg = "Vui lòng đăng nhập để tiếp tục!";
                window.location.href = loginUrl + "?returnUrl=" + dataUrl + "&SessionEnd=True";
            }
        }
        toastr.error(msg, "Thông báo");
    });
}

var modalDetail = null;
var detailId = 0;
function showDetail(id) {
    var item = findVehicleBannedListById(id);
    if (item == null) {
        alert("Không tìm thấy xe cấm vào ra nào!");
        return false;
    }

    detailId = id;
    $("#modal-detail .modal-body span.info-lb").each(function () {
        var name = this.getAttribute('name');
        if (item[name] != null)
            this.innerHTML = item[name];
        else
            this.innerHTML = '';
    });

    isNeedUpdateDataTable = false;

    if (modalDetail == null) {
        modalDetail = $("#modal-detail");
        modalDetail.on("hidden.bs.modal", function () {
            if (isNeedUpdateDataTable) {
                isNeedUpdateDataTable = false;
                table.draw();
            }
        });
    }

    if (tableHistory == null) {
        var index = 0;
        tableHistory = $("#table-history").DataTable({
            "processing": true,
            "lengthMenu": [[5, 10, 20, 30, 50, 100, -1], [5, 10, 20, 30, 50, 100, "All"]],
            "displayLength": 10,
            "ajax": {
                "url": baseUrl + '/GetVehicleBannedListHistorys',
                "dataType": 'json',
                "type": "POST",
                "headers": {
                    "RequestVerificationToken": $("input[name='__RequestVerificationToken']").val()
                },
                "data": function (d) {
                    d.keyword = d.search.value;
                    delete d.columns;
                    delete d.search;
                    d.id = detailId;
                    index = d.start;
                    $("#table-history tbody").html('<td colspan="15">Đang tải...</td>');
                } ,
                error: function (e, e1, e2) {
                    var msg = 'Có lỗi. Tải dữ liệu thất bại!';
                    if (e && typeof e == "object" && e["responseText"]) {
                        if (e["responseText"].indexOf("Security/Login") !== -1) {
                            msg = "Vui lòng đăng nhập để tiếp tục!";
                            window.location.href = loginUrl + "?returnUrl=" + dataUrl + "&SessionEnd=True";
                        }
                    }
                    toastr.error(msg, "Thông báo");
                    $("#jsdatatable-container").removeClass("loading");
                }
            },
            "serverSide": true,
            "searching": true,
            "ordering": false,
            "scrollX": true,
            "scrollY": true,
            "autoWidth": false,
            "oLanguage": {
                "sProcessing": "Đang xử lý...",
                "sLengthMenu": "Xem _MENU_ mục",
                "sZeroRecords": "Không tìm thấy dòng nào phù hợp",
                "sInfo": "Đang xem _START_ đến _END_ trong tổng số _TOTAL_ mục",
                "sInfoEmpty": "Đang xem 0 đến 0 trong tổng số 0 mục",
                "sInfoFiltered": "(được lọc từ _MAX_ mục)",
                "sSearch": "Tìm:",
                "oPaginate": {
                    "sFirst": "Đầu",
                    "sPrevious": "Trước",
                    "sNext": "Tiếp",
                    "sLast": "Cuối"
                }
            },
            dom: '<"html5buttons"B>lTTfgitp',
            buttons: [
                'copyHtml5',
                {
                    'extend': 'excelHtml5',
                    'title': 'Lịch sử cấm vào ra',
                    'filename': getExportHistoryFileName(),
                    'exportOptions': {
                        columns: ':not(.not-export)'
                    }
                },
                {
                    'extend': 'csvHtml5',
                    'title': 'Lịch sử cấm vào ra',
                    'charset': 'UTF-8',
                    'bom': true,
                    'filename': getExportHistoryFileName(),
                    'exportOptions': {
                        columns: ':not(.not-export)'
                    }
                },
                {
                    'extend': 'pdfHtml5',
                    'title': 'Lịch sử cấm vào ra',
                    'orientation': 'landscape',
                    'pageSize': 'LEGAL',
                    'filename': getExportHistoryFileName(),
                    'exportOptions': {
                        columns: ':not(.not-export)'
                    }
                }
            ],
            "fixedHeader": {
                "header": false,
                "footer": false
            },
            "columnDefs": [
                { "width": "40px", "targets": 0 },
                {
                    "width": "100px",
                    "targets": 1,
                    "render": function (data, type, row) {
                        var html = '';
                        if (row.allowEdit)
                            html += '<a href="#" onclick="return updateHistory(' + row.id + ')">Sửa</a>';
                        if (row.allowClear)
                            html += (html == '' ? '' : '&nbsp;&nbsp;-&nbsp;&nbsp;') + '<a style="color: #006a55" href="#" onclick="return clearRow(' + detailId + ',' + row.id + ')">Hủy cấm</a>';
                        return html;
                    }
                },
                {
                    "width": "190px",
                    "targets": 2,
                    "render": function (data, type, row) {
                        if (row.updatedDate) {
                            return row.createdDate + "<br /><span style='font-size: 90%;color: #888'>(Cập nhật: <b>" + row.updatedDate + "</b>, bởi <b>"+ row.updatedByName +"</b> - <a href='javascript:void(0)' onclick='showHistoryEditLog(" + row.id + ")'>Xem Log</a>)</span>";
                        }
                        return row.createdDate;
                    } },
                { "width": "100px", "targets": 3 },
                { "width": "130px", "targets": 4 },
                { "width": "150px", "targets": 5 },
                { "width": "200px", "targets": 6 },
                { "width": "200px", "targets": 7 },
                { "width": "200px", "targets": 8 },
                {
                    "width": "200px",
                    "targets": 9,
                    "render": function (data, type, row) {
                        if (data != null && data.length > 45) {
                            return data.substr(0, 45) + "... <a href='#' onclick='return readMore(this)'>Xem thêm</a><span style='display: none'>" + data + "</span>";
                        }
                        return data;
                    }
                },
                { "width": "120px", "targets": 10 },
                { "width": "120px", "targets": 11 },
                { "width": "120px", "targets": 12 },
                { "width": "110px", "targets": 13 },
                { "width": "150px", "targets": 14 },
                {
                    "width": "150px",
                    "targets": 15,
                    "render": function (data, type, row) {
                        if (data != null && data.length > 45) {
                            return data.substr(0, 45) + "... <a href='#' onclick='return readMore(this)'>Xem thêm</a><span style='display: none'>" + data + "</span>";
                        }
                        return data;
                    }
                },
                {
                    "width": "200px",
                    "targets": 16,
                    "render": function (data, type, row) {
                        if (data != null && data.length > 45) {
                            return data.substr(0, 45) + "... <a href='#' onclick='return readMore(this)'>Xem thêm</a><span style='display: none'>" + data + "</span>";
                        }
                        return data;
                    }
                }
            ],
            "fixedColumns": true,
            "columns": [
                { "data": function () { return ++index; } },
                { "data": "actionColumn" },
                { "data": "createdDate" },
                {
                    "data": function (d) {
                        if (d.bannedIndex != -1)
                            return d.actionType + "<br />(Lệnh cấm " + d.bannedIndex + ")";
                        if (d.isExpired)
                            return d.actionType + "<br />(Hết hạn cấm)";
                        return d.actionType;
                    }
                },
                { "data": "userAgent" },
                {
                    "data": function (d) {
                        d.truckID = formatPlateNumber(d.truckID);
                        return d.truckID;
                    }
                },
                { "data": "activeTime" },
                { "data": "expiryTime" },
                { "data": "violationType" },
                { "data": "reasonViolation" },
                { "data": "truckKey" },
                { "data": "ownerName" },
                { "data": "foundBy" },
                { "data": "clearBy" },
                { "data": "clearDate" },
                { "data": "reasonClear" },
                { "data": "note" }
            ],
            'fnDrawCallback': function (oSettings) {
                $(".html5buttons .dt-buttons").addClass("btn-group");
                $(".html5buttons .dt-button").addClass("btn btn-default");
                $('#table-history_filter input').unbind();
                $('#table-history_filter input').bind('keyup', function (e) {
                    if (e.keyCode == 13) {
                        tableHistory.search(this.value).draw();
                    }
                });
            },
            'createdRow': function (row, data) {
                if (data.isCurrentBannedHistory) {
                    $(row).css("backgroundColor", "#d7fded");
                } else if (data.actionTypeVal == 0) {
                    $(row).css("backgroundColor", "#f3f3f3");
                }
            }
        });
    } else {
        tableHistory.draw();
    }

    modalDetail.css("opacity", 1).modal('show');
}

var dialogHistoryEditLog = null;
function showHistoryEditLog(id) {
    //find info - Begin
    var data = tableHistory.rows().data();
    var item = null;
    for (var i = 0; i < data.length; i++) {
        if (data[i].id != null) {
            if (data[i].id == id) {
                item = data[i];
                break;
            }
        }
    }

    if (dialogHistoryEditLog == null) {
        dialogHistoryEditLog = $("#dialog-view-history-log");
        dialogHistoryEditLog.on("hidden.bs.modal", function () {
            $(document.body).addClass("modal-open");
            $("#modal-detail").css("opacity", 1);
        });

        dialogHistoryEditLog.on("shown.bs.modal", function () {
            $(document.body).addClass("modal-open");
            $("#modal-detail").css("opacity", 0.5);
        });
    }

    if (item) {
        var html = '';
        if (item.editHistoryJson) {
            var logs = jQuery.parseJSON(item.editHistoryJson);
            for (var key in logs) {
                html += '<tr>';
                html += '<td>' + logs[key].UserName + '</td>';
                html += '<td>' + logs[key].UpdatedTime + '</td>';
                html += '<td>' + logs[key].ExpiryTime + '</td>';
                html += '<td>' + (!logs[key].ReasonViolation ? '' : logs[key].ReasonViolation) + '</td>';

                html += '<td>' + item.expiryTime + '</td>';
                html += '<td>' + item.reasonViolation + '</td>';
                html += '<td>' + (!logs[key].Note ? '' : logs[key].Note) + '</td>';

                html += '</tr>';
            }
        }
        $("#table-view-history-log").html(html);
        dialogHistoryEditLog.modal("show");
    }
}

function findVehicleBannedListById(id) {
    //find info - Begin
    var data = table.rows().data();
    var item = null;
    for (var i = 0; i < data.length; i++) {
        if (data[i].id != null) {
            if (data[i].id == id) {
                item = data[i];
                break;
            }
        }
    }

    return item;
}

function findVehicleBannedListByPlateNumber(plateNumber) {
    //find info - Begin
    var data = table.rows().data();
    var item = null;
    for (var i = 0; i < data.length; i++) {
        if (data[i].id != null) {
            if (data[i].truckID.replace(/(\.|-| )/gi, "").toUpperCase() == plateNumber) {
                item = data[i];
                break;
            }
        }
    }

    return item;
}

var curBannedIdDelete = 0;
var curBannedElementDelete = null;
function deleteRow(els, id) {
    var item = findVehicleBannedListById(id);
    if (item == null) {
        alert("Không tìm thấy nội dung cần xóa!");
        return false;
    }

    $("#modal-confirm .modal-body p strong").html('Bạn chắc muốn xóa xe cấm vào ra <b>' + item.truckID + '</b>?');
    $("#modal-confirm").modal('show');
    curBannedIdDelete = id;
    curBannedElementDelete = els;

    return false;
}

function updateHistory(id) {
    var data = tableHistory.rows().data();
    var item = null;
    for (var i = 0; i < data.length; i++) {
        if (data[i].id != null) {
            if (data[i].id == id) {
                item = data[i];
                break;
            }
        }
    }

    if (item == null) {
        toastr.error("Không tìm thấy lịch sử xe vi phạm cần sửa!");
        return false;
    }

    if (item.allowEdit || (item.actionTypeVal == 0 && isHasEditRole == "true")) {
        showUpdateHistoryModal(item);
    } else {
        toastr.error("Bạn không có quyền chỉnh sửa!");
    }

    return false;
}

var isNeedUpdateHistoryTable = false;
var updateHistoryItem = null;
var updateHistoryModal = null;
function showUpdateHistoryModal(item) {
    updateHistoryItem = item;
    if (!updateHistoryModal) {
        updateHistoryModal = $("#dialog-update-history-form");
        updateHistoryModal.on("hidden.bs.modal", function () {
            $(".datePickeModal").hide();
            if (isNeedUpdateHistoryTable)
                tableHistory.draw();
            isNeedUpdateHistoryTable = false;
            $(document.body).addClass("modal-open");
            $("#modal-detail").css("opacity", 1);
        });

        updateHistoryModal.on("shown.bs.modal", function () {
            $("#modal-detail").css("opacity", 0.5);
        });

        $("#saveHistoryBtn").on('click', function () {
            var formData = getFormData("#dialog-update-history-form .form-control");
            if (formData == null)
                return false;

            //var acTime = convertDateFormatToDDMMYY(formData.activeTime) + " " + formData.activeHour;
            var expTime = convertDateFormatToDDMMYY(formData.expiryTime) + " " + formData.expiryHour;
            if (expTime == updateHistoryItem.expiryTime &&
                formData.reasonViolation == updateHistoryItem.reasonViolation) {
                clearFormText('#dialog-update-history-form');
                updateHistoryModal.modal("hide");
                return false;
            }

            var self = $(this);
            self.prop("disabled", true);
            var data = {
                id: updateHistoryItem.id,
                //activeTime: formData.activeTime + " " + formData.activeHour + ":00",
                expiryTime: formData.expiryTime + " " + formData.expiryHour + ":00",
                reasonViolation: formData.reasonViolation,
                note: formData.note
            };

            $.ajax({
                method: "POST",
                url: baseUrl + "/UpdateVehicleBannedListHistory",
                dataType: "json",
                headers: {
                    RequestVerificationToken: $("input[name='__RequestVerificationToken']").val()
                },
                data: data
            }).done(function (res) {
                self.prop("disabled", false);
                if (res.success) {
                    isNeedUpdateHistoryTable = true;
                    isNeedUpdateDataTable = true;
                    clearFormText('#dialog-update-history-form');
                    updateHistoryModal.modal("hide");
                    toastr.success('Cập nhật thành công!', 'Thông báo');
                    if (res.isUpdateCurrentHistory) isNeedUpdateDataTable = true;
                } else {
                    toastr.error(res.message, 'Thông báo');
                }
            }).fail(function (e) {
                self.prop("disabled", false);
                var msg = 'Có lỗi. Cập nhật thất bại!';
                if (e && typeof e == "object" && e["responseText"]) {
                    if (e["responseText"].indexOf("Security/Login") !== -1) {
                        msg = "Vui lòng đăng nhập để tiếp tục!";
                        window.location.href = loginUrl + "?returnUrl=" + dataUrl + "&SessionEnd=True";
                    }
                }
                toastr.error(msg, "Thông báo");
            });
        });
    }

    setFormData("#updateHistoryForm .form-control", {
        reasonViolation: item.reasonViolation,
        note: ""
    });

    var _historyExpiryDate = convertDateFormatToYYMMDD(item.expiryTime.split(' ')[0]);
    var _historyExpiryTime = item.expiryTime.split(' ')[1];
    $("#expiryHistoryDatePicker").datepicker('setDate', new Date(_historyExpiryDate));
    $("#historyExpiryTimeHourTxt").val(_historyExpiryTime);
    $("#createdTimeHistoryText").text(item.createdDate);
    $("#createdByHistoryText").text(item.userAgent);
    $("#plateNumberHistoryText").text(item.truckID);
    $("#activeTimeHistoryText").text(item.activeTime);

    updateHistoryModal.modal('show');
}

function setFormData(selector, data, ignoreList) {
    $(selector).each(function () {
        if (this.name in data) {
            if (data[this.name] != null && (ignoreList == null || ignoreList.indexOf(this.name) === -1))
                this.value = data[this.name];
            else
                this.value = '';
        }
    });
}

function getFormData(selector) {
    var formData = {};
    var isError = false;
    $(selector).each(function () {
        var value = $.trim(this.value);
        if (this.getAttribute("data-validate") != null) {
            if (this.getAttribute("data-validate") == "required") {
                if (value == "") {
                    $(this).addClass("error").on('change', onChangeText).parent().find("small.error").show();
                    isError = true;
                    return true;
                }
            } else {
                if (this.getAttribute("data-validate") == "required-date") {
                    if (value == "") {
                        $(this).addClass("error").on('change', onChangeText).parent().parent().find("small.error").show();
                        isError = true;
                        return true;
                    }
                }
            }
        }

        if (this.getAttribute("data-datepicker") != null) {
            value = convertDateFormatToYYMMDD(value, true);
            if (value == null) {
                $(this).addClass("error").on('change', onChangeText).parent().parent().find("small.error").show();
                isError = true;
                return true;
            }
        }

        formData[this.name] = value;
    });

    if (isError)
        return null;

    return formData;
}

function onChangeText() {
    $(this).removeClass("error").parent().parent().find("small.error").hide();
    $(this).off("change", onChangeText);
}

function clearFormError(selector) {
    $(selector).find(".form-control").removeClass('error').off('change', onChangeText);
    $(selector).find("small.error").hide();
}

function clearFormText(selector) {
    $(selector).find(".form-control").val("");
    $("#activeDatePicker").datepicker('setDate', new Date(_toDate));
    $("#expiryDatePicker").datepicker('setDate', new Date(_expiryDate));
}

function getExportFileName() {
    var n = new Date().getTime();
    return 'Danh sách xe cấm vào ra -' + n;
}

function getExportHistoryFileName() {
    var n = new Date().getTime();
    return 'Lịch sử xe cấm vào ra -' + n;
}

function convertDateFormatToYYMMDD(date, isReturnError) {
    date = $.trim(date);
    var arrDate = date.split('/');
    if (arrDate.length != 3) {
        if (isReturnError)
            return null;

        return new Date().toString();
    }

    var year = parseInt(arrDate[2]);
    if (isNaN(year) || year <= 0) {
        if (isReturnError)
            return null;

        return new Date().toString();
    }

    var month = parseInt(arrDate[1]);
    if (isNaN(month) || month > 12 || month < 1) {
        if (isReturnError)
            return null;

        return new Date().toString();
    }

    var day = parseInt(arrDate[0]);
    if (isNaN(day) || day > 31 || day < 1) {
        if (isReturnError)
            return null;

        return new Date().toString();
    }

    return arrDate[2] + '-' + arrDate[1] + '-' + arrDate[0];
}

function convertDateFormatToDDMMYY(date, isReturnError) {
    date = $.trim(date);

    var arrDate = date.split('-');
    if (arrDate.length != 3) {
        if (isReturnError)
            return null;

        return new Date().toString();
    }

    var year = parseInt(arrDate[0]);
    if (isNaN(year) || year <= 0) {
        if (isReturnError)
            return null;

        return new Date().toString();
    }

    var month = parseInt(arrDate[1]);
    if (isNaN(month) || month > 12 || month < 1) {
        if (isReturnError)
            return null;

        return new Date().toString();
    }

    var day = parseInt(arrDate[2]);
    if (isNaN(day) || day > 31 || day < 1) {
        if (isReturnError)
            return null;

        return new Date().toString();
    }

    return arrDate[2] + '/' + arrDate[1] + '/' + arrDate[0];
}