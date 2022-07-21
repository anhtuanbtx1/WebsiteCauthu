var table = null;
var tableHistory = null;
jQuery(document).ready(function () {
    $.fn.datepicker.defaults.language = 'vi';
    //set datepicker - Begin
    $("#fromActiveTime,#toActiveTime, #fromExpiryTime, #toExpiryTime, #activeDatePicker,#expiryDatePicker, #dateOfIssueDatePicker, #thoiGianCamDatePicker").datepicker({
        format: 'dd/mm/yyyy',
        todayBtn: "linked",
        keyboardNavigation: false,
        forceParse: false,
        calendarWeeks: true,
        autoclose: true,
        todayHighlight: true
    });

    $("#birthDayDatePicker").datepicker({
        format: 'dd/mm/yyyy',
        todayBtn: "linked",
        keyboardNavigation: false,
        forceParse: false,
        calendarWeeks: true,
        autoclose: true,
        todayHighlight: true,
        defaultViewDate: { year: new Date().getFullYear() - 20 }
    });


    $("#activeDatePicker").datepicker('setDate', new Date(_toDate));
    //$("#expiryDatePicker").datepicker('setDate', new Date(_expiryDate));

    $("#activeTimeTxt").on("focus", function (e) {
        var rect = $("#dialog-form .modal-dialog")[0].getBoundingClientRect();
        $("#activeDatePicker").css({
            top: this.getBoundingClientRect().top + rect.top + $("#dialog-form").scrollTop() - 35,
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

    $("#birthDayTimeTxt").on("focus", function (e) {
        var rect = $("#dialog-form .modal-dialog")[0].getBoundingClientRect();
        $("#birthDayDatePicker").css({
            top: this.getBoundingClientRect().top + rect.top + $("#dialog-form").scrollTop() - 35,
            left: this.getBoundingClientRect().left + 10
        }).show().datepicker('show');
    });

    $("#dateOfIssueTimeTxt").on("focus", function (e) {
        var rect = $("#dialog-form .modal-dialog")[0].getBoundingClientRect();
        $("#dateOfIssueDatePicker").css({
            top: this.getBoundingClientRect().top + rect.top + $("#dialog-form").scrollTop() - 35,
            left: this.getBoundingClientRect().left + 10
        }).show().datepicker('show');
    });

    $("#thoiGianCamTxt").on("focus", function (e) {
        var rect = $("#dialog-rebanned-form .modal-dialog")[0].getBoundingClientRect();
        $("#thoiGianCamDatePicker").css({
            top: this.getBoundingClientRect().top + rect.top + $("#dialog-rebanned-form").scrollTop() - 35,
            left: this.getBoundingClientRect().left + 10
        }).show().datepicker('show');
    });

    $("#activeDatePicker").change(function () {
        $("#activeTimeTxt").val($(this).val());
    });

    $("#expiryDatePicker").change(function () {
        $("#expiryTimeTxt").val($(this).val());
    });

    $("#birthDayDatePicker").change(function () {
        $("#birthDayTimeTxt").val($(this).val());
    });

    $("#dateOfIssueDatePicker").change(function () {
        $("#dateOfIssueTimeTxt").val($(this).val());
    });

    $("#thoiGianCamDatePicker").change(function () {
        $("#thoiGianCamTxt").val($(this).val());
    });
    //set datepicker - End

    //set timepicker - Begin
    $("#activeTimeHourTxt, #expiryTimeHourTxt, #thoiGianCamHourTxt").clockpicker({
        autoclose: true
    });
    $("#activeTimeHourTxt").on("change", function () {
        if (!isValidTimeString(this.value)) {
            this.value = "00:00";
        }
    });
    $("#expiryTimeHourTxt, #thoiGianCamHourTxt").on("change", function () {
        if (!isValidTimeString(this.value)) {
            this.value = "23:59";
        }
    });
    //set timepicker - End

    //set multiselect - Begin
    $("#reasonViolation").multiselect({
        allSelectedText: "Tất cả",
        numberDisplayed: 10
    });
    //set multiselect - End

    //dataTables - Begin
    var tableColumnData = [
        { "data": 'index' },
        { "data": function () { return ''; }, "orderable": false },
        { "data": "paperCode" },
        { "data": "fullName" },
        { "data": "activeTime" },
        { "data": "expiryTime" },
        { "data": "reasonViolation" },
        { "data": "createdBy" },
        { "data": "createdDate" },
        { "data": "clearFlag" },
        { "data": "reasonClear" },
        { "data": "clearBy" },
        { "data": "clearDate" },
        { "data": "company" },
        { "data": "phoneNumber" },
        { "data": "birthDay" },
        { "data": "placeOfBirth" },
        { "data": "note" }
    ];


    table = $('#bannedListTable').DataTable({
        "processing": true,
        "lengthMenu": [[5, 10, 20, 30, 50, 100, -1], [5, 10, 20, 30, 50, 100, "All"]],
        "displayLength": pageLength_dataTable(),
        "data": [],
        "serverSide": false,
        "searching": true,
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
                'title': "Danh sách người cấm vào ra",
                'filename': getExportFileName(),
                'exportOptions': {
                    columns: ':not(.not-export)'
                }
            },
            {
                'extend': 'csvHtml5',
                'title': "Danh sách người cấm vào ra",
                'charset': 'UTF-8',
                'bom': true,
                'filename': getExportFileName(),
                'exportOptions': {
                    columns: ':not(.not-export)'
                }
            },
            {
                'extend': 'pdfHtml5',
                'title': "Danh sách người cấm vào ra",
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
            { "width": "150px", "targets": 1 },
            { "width": "130px", "targets": 2 },
            { "width": "150px", "targets": 3 },
            { "width": "150px", "targets": 4 },
            { "width": "150px", "targets": 5 },
            { "width": "220px", "targets": 6 },
            { "width": "120px", "targets": 7 },
            { "width": "120px", "targets": 8 },
            { "width": "100px", "targets": 9 },
            { "width": "220px", "targets": 10 },
            { "width": "120px", "targets": 11 },
            { "width": "120px", "targets": 12 },
            { "width": "120px", "targets": 13 },
            { "width": "120px", "targets": 14 },
            { "width": "110px", "targets": 15 },
            { "width": "150px", "targets": 16 },
            { "width": "200px", "targets": 17 }
        ],
        "fixedColumns": true,
        "columns": tableColumnData,
        'fnDrawCallback': function (oSettings) {

            $(".html5buttons .dt-buttons").addClass("btn-group");
            $(".html5buttons .dt-button").addClass("btn btn-default");
            $("#searchBtn").prop("disabled", false).html("Lọc dữ liệu");
            $("#bannedListTable_wrapper table.dataTable thead th.not-export").removeClass("sorting_asc").addClass("sorting_disabled");
        },
        'createdRow': function (row, data) {
            if (data.isValidBanned == true)
                $(row).addClass("banned");
            var actionColumn = $(row).find("td").eq(1);
            var buttonsHtml = '<a href="#" style="color: #006a55" onclick="return showDetail(\'' + data.idKhachHang + '\')">Chi tiết</a> &nbsp; - &nbsp;';
            buttonsHtml += '<a href="#" onclick="return cam(\'' + data.idKhachHang + '\')">Cấm</a>&nbsp; - &nbsp;';
            buttonsHtml += '<a href="#" onclick="return clearRow(\'' + data.idKhachHang + '\')">Hủy</a>';
            
            actionColumn.html(buttonsHtml)
        }
    });

    $("#searchBtn").on('click', function () {
        if ($.trim($("#reasonViolation").val()) != "") {
            loadTableData();
        } else {
            toastr.error("Vui lòng chọn lý do vi phạm");
        }
    });

    $("#paperCode, #fullName").on("keydown", function (e) {
        if (e.keyCode == 13) {
            if ($.trim($("#reasonViolation").val()) != "") {
                loadTableData();
            } else {
                toastr.error("Vui lòng chọn lý do vi phạm");
            }
        }
    });
    //dataTables - End

    //add new - Begin
    $("#addNew").on("click", addNew);
    //add new - End

    //event - Begin
    $("#clearBannedListSaveBtn").on('click', clearBannedList);
    $("#clearSearchText").on('click', function () {
        $('#truckId').val('');
        loadTableData();
    });
    $("#collapseMoreHumanInfo").on('hidden.bs.collapse', function () {
        $("#collapseIcon").attr("class", "fa fa-chevron-down");
    });
    $("#collapseMoreHumanInfo").on('show.bs.collapse', function () {
        $("#collapseIcon").attr("class", "fa fa-chevron-up");
    });
    //event - End

    //import - Begin
    $("#importExcel").on("click", importExcel);
    //import - End

    loadTableData();
});

function loadTableData() {
    $("#jsdatatable-container").addClass("loading");
    $("table#bannedListTable tbody").html('<tr><td colspan="10">.</td></tr>');

    var d = {};
    d.paperCode = $.trim($('#paperCode').val());
    d.fullName = $.trim($('#fullName').val());
    d.fromActiveTime = convertDateFormatToYYMMDD($("#fromActiveTime").datepicker().val(), true);
    d.toActiveTime = convertDateFormatToYYMMDD($("#toActiveTime").datepicker().val(), true);
    d.fromExpiryTime = convertDateFormatToYYMMDD($("#fromActiveTime").datepicker().val(), true);
    d.toExpiryTime = convertDateFormatToYYMMDD($("#toActiveTime").datepicker().val(), true);

    var reasonClear = $("#reasonCancelForbidsInput").val();
    d.reasonViolation = $("#reasonViolation").val();
    if (reasonClear != "") {
        if (d.reasonViolation != "") {
            d.reasonViolation += "," + reasonClear;
        } else {
            d.reasonViolation = reasonClear;
        }
    }

    $("#searchBtn").prop("disabled", true).html("Đang tải...");

    $.ajax({
        url: dataUrl,
        dataType: 'json',
        type: "POST",
        headers: {
            "RequestVerificationToken": $("input[name='__RequestVerificationToken']").val()
        },
        data: d,
        success: function (d) {
            $("#jsdatatable-container").removeClass("loading");
            table.clear().rows.add(d.data).draw();
        },
        error: function (e, e1, e2) {
            var msg = 'Có lỗi. Tải dữ liệu thất bại!';
            if (e && typeof e == "object" && e["responseText"]) {
                if (e["responseText"].indexOf("Security/Login") !== -1) {
                    msg = "Vui lòng đăng nhập để tiếp tục!";
                    window.location.href = loginUrl + "?returnUrl=" + dataUrl + "&SessionEnd=True";
                }
            }
            toastr.error(msg, 'Thông báo');
            $("#jsdatatable-container").removeClass("loading");
        }
    });
}


var dialogImport = null;
function importExcel() {
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
                    url: baseUrl + "/ImportHumanList",
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
                            loadTableData();
                        } else {
                            toastr.error('Import thất bại');
                        }
                        $("#importBtn").prop("disabled", true);
                    },
                    error: function () {
                        var msg = 'Có lỗi. Import thất bại!';
                        if (e && typeof e == "object" && e["responseText"]) {
                            if (e["responseText"].indexOf("Security/Login") !== -1) {
                                msg = "Vui lòng đăng nhập để tiếp tục!";
                                window.location.href = loginUrl + "?returnUrl=" + dataUrl + "&SessionEnd=True";
                            }
                        }
                        toastr.error(msg, 'Thông báo');
                        $("#importBtn").prop("disabled", false);
                    }
                });
            }
        });
    }

    dialogImport.modal("show");
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

var dialog = null;
var onSaveForm = null;
var curIdUpdate = 0;
var isNeedUpdateDataTable = false;
var isInsertMode = true;

function enterInfo(isInsert) {
    isInsertMode = isInsert;

    if (dialog == null) {
        dialog = $("#dialog-form").modal('show');
        dialog.on('shown.bs.modal', function () {
            dialog.find('input[name="paperCode"]').focus();
            isModalOpen = true;
        });
        dialog.on('hidden.bs.modal', function () {

            if (isNeedUpdateDataTable)
                loadTableData();

            //onHideAutoComplete();
            //onModalClose();
        });

        dialog.on('hide.bs.modal', function () {
            $(".datePickeModal").hide();
        });

        $("#infoForm").on("submit", function () {
            var formData = getFormData("#infoForm .form-control");
            if (formData == null)
                return false;

            $("#saveDialogForm").prop('disabled', true);
            onSaveForm(formData);
            return false;
        });

        $("#saveDialogForm").on("click", function () {
            $("#infoForm").submit();
        });

        var isPaperCode = function (text) {
            if (text.length > 1) {
                return true;
            }
            return false;
        }

        /*var autoCompletBox = $("#paperCodeAutoComplateBox");
        var autoCompleteLoader = $("#autoCompleteLoader");

        var limitAutoCompleteData = function (maxLength) {
            if (autoComplateData.length > maxLength) {
                var data = [];
                var chPlateNumber = plateNumber.split('');
                for (var key in autoComplateData) {
                    var numOfMatcher = 0;
                    var ch = autoComplateData[key].paperCode.split('');
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

        var isAutoCompleteBoxShowing = true;
        var numOfPaperCodeItem = 0;
        var autoCompleteItemIndex = -1;
        var moveTop = function () {
            if (isAutoCompleteBoxShowing) {
                if (autoCompleteItemIndex == 0) {
                    autoCompleteItemIndex = -1;
                } else if (autoCompleteItemIndex == -1) {
                    autoCompleteItemIndex = numOfPaperCodeItem - 1;
                } else {
                    autoCompleteItemIndex--;
                }

                isSelectedByMouseHover = false;
                autoCompletBox.children("li.active").removeClass("active");
                if (autoCompleteItemIndex != -1)
                    autoCompletBox.children("li").eq(autoCompleteItemIndex).addClass("active");
            }
        }

        var moveBottom = function () {
            if (isAutoCompleteBoxShowing) {
                if (autoCompleteItemIndex == numOfPaperCodeItem - 1) {
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
                    onSelectedPaperCode($.trim(els.attr("data-value")), els.attr("data-id"));
                    onHideAutoComplete();
                } else {
                    if (numOfPaperCodeItem == 1) {
                        var els = autoCompletBox.children("li").eq(0);
                        onSelectedPaperCode($.trim(els.attr("data-value")), els.attr("data-id"));
                        onHideAutoComplete();
                    } else {
                        onHideAutoComplete();
                    }
                }
            }
        };

        var onShowAutoComplete = function () {
            if (autoComplateData.length > 0) {
                autoCompleteItemIndex = -1;
                autoComplateData = limitAutoCompleteData(10);
                numOfPaperCodeItem = autoComplateData.length;

                autoCompletBox.html("");
                for (var key in autoComplateData) {
                    var text = autoComplateData[key].paperCode;
                    if (autoComplateData[key].name) {
                        text += " (" + autoComplateData[key].name + ")";
                    }
                    autoCompletBox.append($("<li>").
                        attr("data-id", autoComplateData[key].id).
                        attr("data-value", autoComplateData[key].paperCode).
                        html(text));
                }

                if ($("#infoForm #paperCode").is(":focus")) {
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

        var isModalOpen = true;
        var onModalClose = function () {
            isModalOpen = false;
            selectPaperCode = '';
            oldPaperCode = '';
            autoComplateData = [];
            fullAutoCompleteData = [];
        };

        var searchPaperCode = function () {
            autoCompleteLoader.show();
            $.ajax({
                url: baseUrl + "/SearchPaperCode",
                type: "POST",
                data: { paperCode: paperCode },
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
                error: function () {
                    autoCompleteLoader.hide();
                }
            });
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
                        url: baseUrl + "/LoadHumanBannedListInfo",
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
                                    toastr.error("Không tìm thấy thông tin người bị cấm!");
                                }
                            }
                        },
                        error: function () {
                            toastr.error("Không tìm thấy thông tin người bị cấm!");
                            dialog.modal('hide');
                        }
                    });
                }
            }
        };

        var timer = null;
        var paperCode = '';
        var oldPaperCode = '';
        var autoComplateData = [];
        var fullAutoCompleteData = [];
        var selectPaperCode = '';
        var selectPaperCodeByUser = '';

        var autoCompletePaperCode = function (_paperCode) {
            paperCode = _paperCode;
            if (oldPaperCode == paperCode)
                return true;

            oldPaperCode = paperCode;
            clearTimeout(timer);
            if (paperCode != "") {
                autoCompleteLoader.show();
                timer = setTimeout(function () {
                    if (isPaperCode(paperCode)) {
                        searchPaperCode();
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

        var onSelectedPaperCode = function (_paperCode, id) {
            if (isInsertMode) {
                selectPaperCode = _paperCode;
                selectPaperCodeByUser = selectPaperCode;
                $("#infoForm #paperCode").val(_paperCode);
                loadEditBannedList(id);
            }
        };

        var isSelectedByMouseHover = false;
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
            onSelectedPaperCode($.trim($(this).attr("data-value")), $(this).attr("data-id"));
        });

        var onBlur = function () {
            var p = $.trim($("#infoForm #paperCode").val());
            if (selectPaperCode != p) {
                selectPaperCode = p;
                if (selectPaperCode == "")
                    return;

                if (fullAutoCompleteData.length > 0) {
                    var id = -1;
                    for (var key in fullAutoCompleteData) {
                        var pp = fullAutoCompleteData[key].paperCode;
                        if (pp == selectPaperCode) {
                            id = fullAutoCompleteData[key].id;
                            break;
                        }
                    }
                    if (id !== -1) {
                        selectPaperCodeByUser = selectPaperCode;
                        loadEditBannedList(id);
                        return true;
                    }
                }

                var item = findVehicleBannedListByPaperCode(selectPaperCode);
                if (item) {
                    selectPaperCodeByUser = selectPaperCode;
                    loadEditBannedList(item.id);
                    return;
                }

                autoCompleteLoader.show();

                $.ajax({
                    url: baseUrl + "/FindHumanBannedIdByPaperCode",
                    type: "POST",
                    data: { paperCode: selectPaperCode },
                    dataType: 'json',
                    headers: {
                        RequestVerificationToken: $("input[name='__RequestVerificationToken']").val()
                    },
                    success: function (data) {
                        autoCompleteLoader.hide();
                        if (data != -1) {
                            selectPaperCodeByUser = selectPaperCode;
                            loadEditBannedList(data);
                        }
                    },
                    error: function () {
                        autoCompleteLoader.hide();
                    }
                });
            }
        };

        $("#infoForm #paperCode").on("keyup", function (e) {
            if (isInsertMode) {
                if (e.keyCode == 38) {
                    moveTop();
                } if (e.keyCode == 40) {
                    moveBottom();
                } if (e.keyCode == 13) {
                    onEnter();
                } else {
                    autoCompletePaperCode(this.value);
                }
            }
        }).on("drop", function () {
            if (isInsertMode) {
                var self = this;
                setTimeout(function () {
                    autoCompletePaperCode(self.value);
                }, 1);
            }
        }).on("paste", function () {
            if (isInsertMode) {
                var self = this;
                setTimeout(function () {
                    autoCompletePaperCode(self.value);
                }, 1);
            }
        }).on("focus", function () {
            if (isInsertMode && $.trim(this.value) != "") {
                if (this.value != selectPaperCodeByUser) {
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
                }, 500);
            }
        });*/
    }

    isNeedUpdateDataTable = false;
    $("#success-message").hide();
    clearFormError('#infoForm');
    dialog.modal("show");
}

function isExistSearchData(content, selector) {
    var existList = [];
    $(selector + " option").each(function () {
        var value = $.trim(this.getAttribute("value"));
        if (value != null && value != "") {
            existList.push(value.toLocaleLowerCase());
        }
    });

    return existList.indexOf(content.toLocaleLowerCase()) !== -1;
}

function getCurrentTimeHHMM() {
    var date = new Date();
    return (date.getHours() < 0 ? "0" : "") + date.getHours() + ":" + (date.getMinutes() < 0 ? "0" : "") + date.getMinutes();
}

function getCurrentSeconds() {
    var date = new Date();
    return (date.getSeconds() < 0 ? "0" : "") + date.getSeconds();
}

function addNew() {
    __idUpdate = -1;
    onSaveForm = function (data, isCloseForm) {
        var time = $.trim($("#activeTimeHourTxt").val());
        if (time) {
            data["activeTime"] += " " + time + ":" + getCurrentSeconds();
        } else {
            data["activeTime"] += " " + getCurrentTimeHHMM() + ":" + getCurrentSeconds();
        }
        if ($.trim(data["expiryTimeDate"])) {
            data["expiryTimeDate"] = convertDateFormatToYYMMDD(data["expiryTimeDate"]);
            if (data["expiryTimeDate"]) {
                var time = $.trim($("#expiryTimeHourTxt").val());
                if (time) {
                    data["expiryTimeDate"] += " " + time + ":59";
                } else {
                    data["expiryTimeDate"] += " " + "23:59:59";
                }
            }
        }

        var violationType = $("#reason-" + data.reasonViolation);
        if (violationType.length)
            data["violationType"] = violationType.html();
        else
            data["violationType"] = data.note;
        $.ajax({
            method: "POST",
            url: baseUrl + '/AddHumanBannedList',
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
                }

                $("#activeTimeHourTxt").val(getCurrentTimeHHMM());
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
            toastr.error(msg, 'Thông báo');
            $("#saveDialogForm").prop('disabled', false);
        });
    };

    clearFormText('#infoForm');
    $("#dialog-form .modal-title").html('Cấm người vào ra');
    $("#activeTimeHourTxt").val(getCurrentTimeHHMM());
    $("#expiryTimeHourTxt").val("");

    $("#paperTypeCbb").val(1);
    enterInfo(true);
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

var dialogReBanned = null;

function cam(id) {
    var item = findHumanBannedListById(id);
    if (item == null) {
        toastr.error("Không tìm thấy nội dung cần sửa!");
        return false;
    }

    __idUpdate = id;
    curIdUpdate = id;
    if (dialogReBanned == null) {
        dialogReBanned = $("#dialog-rebanned-form");
        dialogReBanned.on("hidden.bs.modal", function () {
            $(".datePickeModal").hide();
            if (isNeedUpdateDataTable == true)
                loadTableData();
        });

        $("#saveReBannedBtn").on("click", function () {
            saveReBanned();
        });

        $("#dialog-rebanned-form form").on("submit", function () {
            saveReBanned();
            return false;
        });
    }

    $("#dialog-rebanned-form .modal-title").html("Cấm người vào ra - " + item.fullName + " - " + item.paperCode);
    $("#thoiGianCamTxt").val("").trigger("change");
    $("#dialog-rebanned-form textarea[name='note']").val("");
    isNeedUpdateDataTable = false;
    dialogReBanned.modal('show');
    return false;
}

function saveReBanned() {
    var formData = getFormData("#dialog-rebanned-form .form-control");
    if (formData == null)
        return false;

    formData["id"] = curIdUpdate;
    if ($.trim(formData["thoiGianCam"]) != "") {
        var thoiGianCam = convertDateFormatToYYMMDD($.trim(formData["thoiGianCam"]), true);
        if (thoiGianCam == null) {
            toastr.error("Thời gian cấm không hợp lệ");
            return false;
        }

        var time = $.trim($("#thoiGianCamHourTxt").val());
        if (time) {
            thoiGianCam += " " + time + ":59";
        } else {
            thoiGianCam += " " + "23:59:59";
        }
        formData["thoiGianCam"] = thoiGianCam;
    }

    var humanInfo = findHumanBannedListById(curIdUpdate);
    formData["paperCode"] = humanInfo.paperCode;
    formData["fullName"] = humanInfo.fullName;
    var violationType = $("#reason-" + formData["reasonViolationId"]);
    if (violationType.length) {
        formData["violationType"] = violationType.html();
    } else {
        formData["violationType"] = data.note;
    }

    $.ajax({
        method: "POST",
        url: baseUrl + "/ReBanned",
        dataType: "json",
        headers: {
            RequestVerificationToken: $("input[name='__RequestVerificationToken']").val()
        },
        data: formData
    }).done(function (res) {
        if (res.success) {
            isNeedUpdateDataTable = true;
            clearFormText('#dialog-rebanned-form');
            dialogReBanned.modal("hide");
            toastr.success('Cấm đối tượng thành công!', 'Thông báo');
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
        toastr.error(msg, 'Thông báo');
    });
}

var __idUpdate = -1;
function update(id, haveBannedAgain) {

    var item = findHumanBannedListById(id);
    if (item == null) {
        alert("Không tìm thấy nội dung cần sửa!");
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
        data["paperType"] = data["paperTypeVal"];
        data["id"] = curIdUpdate;
        if (__haveBannedAgain != null)
            data["haveBannedAgain"] = true;
        $.ajax({
            method: "POST",
            url: baseUrl + "/UpdateHumanList",
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
            toastr.error(msg, 'Thông báo');
            $("#saveDialogForm").prop('disabled', false);
        });
    };

    curIdUpdate = id;
    if (haveBannedAgain) {
        setFormData("#infoForm .form-control", item, ["reasonViolation", "note"]);
        $("#dialog-form .modal-title").html('Cấm người vào ra');
        setTimeout(function () {
            dialog.find('textarea[name="reasonViolation"]').focus();
        }, 500);
    }
    else {
        setFormData("#infoForm .form-control", item);
        $("#dialog-form .modal-title").html('Cập nhật người cấm vào ra');
    }
    if (haveBannedAgain) {
        $("#activeDatePicker").datepicker('setDate', new Date(_toDate));
        $("#activeTimeHourTxt").val("00:00");
        $("#expiryTimeHourTxt").val("");
    }
    enterInfo(false);
    return false;
}

function deleteBannedList() {
    $("#modal-confirm").modal('hide');
    $.ajax({
        method: "POST",
        url: baseUrl + '/DeleteHumanList',
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
        toastr.error(msg, 'Thông báo');
    });
}

var dialogUnBanned = null;
function clearRow(id) {
    var item = findHumanBannedListById(id);
    if (item == null) {
        toastr.error("Không tìm thấy nội dung cần sửa!");
        return false;
    }

    __idUpdate = id;
    curIdUpdate = id;
    if (dialogUnBanned == null) {
        dialogUnBanned = $("#dialog-unbanned-form");
        dialogUnBanned.on('shown.bs.modal', function () {
            dialogUnBanned.find('textarea[name="reasonClear"]').focus();
        });
        dialogUnBanned.on("hidden.bs.modal", function () {
            if (isNeedUpdateDataTable == true)
                loadTableData();
        });

        $("#dialog-unbanned-form form").on("submit", function () {
            return false;
        });
    }

    $("#dialog-unbanned-form .modal-title").html("Hủy cấm người vào ra - " + item.fullName + " - " + item.paperCode);
    $("#dialog-unbanned-form textarea[name='note']").val("");
    isNeedUpdateDataTable = false;
    dialogUnBanned.modal('show');
    return false;
}

function clearBannedList() {
    var formData = getFormData("#dialog-unbanned-form .form-control");
    if (formData == null)
        return false;

    var humanInfo = findHumanBannedListById(curIdUpdate);
    console.log(humanInfo);
    formData["paperCode"] = humanInfo.paperCode;
    formData["fullName"] = humanInfo.fullName;
    var clearType = $("#clear-" + formData["reasonClearId"]);
    if (clearType.length) {
        formData["reasonClear"] = clearType.html();
    } else {
        formData["reasonClear"] = "";
    }

    formData["id"] = curIdUpdate;
    $.ajax({
        method: "POST",
        url: baseUrl + "/ClearHumanList",
        dataType: "json",
        headers: {
            RequestVerificationToken: $("input[name='__RequestVerificationToken']").val()
        },
        data: formData
    }).done(function (res) {
        if (res.success) {
            isNeedUpdateDataTable = true;
            clearFormText('#dialog-unbanned-form');
            dialogUnBanned.modal("hide");
            toastr.success('Hủy cấm thành công!', 'Thông báo');
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
        toastr.error(msg, 'Thông báo');
    });
}

var detailId = 0;
function showDetail(id) {
    var item = findHumanBannedListById(id);
    if (item == null) {
        alert("Không tìm thấy người cấm vào ra nào!");
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


    if (tableHistory == null) {
        var index = 0;
        tableHistory = $("#table-history").DataTable({
            "processing": true,
            "lengthMenu": [[5, 10, 20, 30, 50, 100, -1], [5, 10, 20, 30, 50, 100, "All"]],
            "displayLength": 10,
            "data": [],
            "serverSide": false,
            "searching": true,
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
                { "width": "100px", "targets": 1 },
                { "width": "190px", "targets": 2 },
                { "width": "130px", "targets": 3 },
                { "width": "150px", "targets": 4 },
                { "width": "150px", "targets": 5 },
                { "width": "220px", "targets": 6 },
                { "width": "100px", "targets": 7 },
                { "width": "220px", "targets": 8 },
                { "width": "150px", "targets": 9 }
            ],
            "fixedColumns": true,
            "columns": [
                { "data": function () { return ++index; } },
                { "data": "actionType" },
                { "data": "createdDate" },
                { "data": "createdBy" },
                { "data": "activeTime" },
                { "data": "expiryTime" },
                { "data": "reasonViolation" },
                { "data": "clearFlag" },
                { "data": "reasonClear" },
                { "data": "clearDate" }
            ],
            'fnDrawCallback': function (oSettings) {
                $(".html5buttons .dt-buttons").addClass("btn-group");
                $(".html5buttons .dt-button").addClass("btn btn-default");
            },
            'createdRow': function (row, data) {

            }
        });
    } else {
        $("table#table-history tbody").html("");
    }

    $.ajax({
        url: baseUrl + '/GetHumanListHistory',
        dataType: 'json',
        type: "POST",
        headers: {
            "RequestVerificationToken": $("input[name='__RequestVerificationToken']").val()
        },
        data: { id: detailId },
        success: function (d) {
            tableHistory.clear().rows.add(d.data).draw();
        },
        error: function (e, e1, e2) {
            var msg = 'Có lỗi. Tải lịch sử thất bại!';
            if (e && typeof e == "object" && e["responseText"]) {
                if (e["responseText"].indexOf("Security/Login") !== -1) {
                    msg = "Vui lòng đăng nhập để tiếp tục!";
                    window.location.href = loginUrl + "?returnUrl=" + dataUrl + "&SessionEnd=True";
                }
            }
            toastr.error(msg, 'Thông báo');
        }
    });


    $("#modal-detail").modal('show');
}

function findHumanBannedListById(id) {
    //find info - Begin
    var data = table.rows().data();
    var item = null;
    for (var i = 0; i < data.length; i++) {
        if (data[i].idKhachHang != null) {
            if (data[i].idKhachHang == id) {
                item = data[i];
                break;
            }
        }
    }

    return item;
}

function findVehicleBannedListByPaperCode(paperCode) {
    //find info - Begin
    var data = table.rows().data();
    var item = null;
    for (var i = 0; i < data.length; i++) {
        if (data[i].id != null) {
            if (data[i].paperCode == paperCode) {
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
    var item = findHumanBannedListById(id);
    if (item == null) {
        alert("Không tìm thấy nội dung cần xóa!");
        return false;
    }

    var msg = 'Bạn chắc muốn xóa người cấm vào ra <b>' + item.fullName + '</b>?';
    $("#modal-confirm .modal-body p b").html(msg);
    $("#modal-confirm").modal('show');
    curBannedIdDelete = id;
    curBannedElementDelete = els;

    return false;
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
            if (this.getAttribute("data-validate") != null) {
                value = convertDateFormatToYYMMDD(value, true);
                if (value == null) {
                    $(this).addClass("error").on('change', onChangeText).parent().parent().find("small.error").show();
                    isError = true;
                    return true;
                }
            } else {
                value = convertDateFormatToYYMMDD(value, true);
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
    $(selector).find(".form-control:not(select)").val("");
    $("#activeDatePicker").datepicker('setDate', new Date(_toDate));
    //$("#expiryDatePicker").datepicker('setDate', new Date(_expiryDate));
}

function getExportFileName() {
    var n = new Date().getTime();
    return 'Danh sách người cấm vào ra -' + n;
}

function getExportHistoryFileName() {
    var n = new Date().getTime();
    return 'Lịch sử người cấm vào ra -' + n;
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
