import Vue from 'vue';

Vue.prototype.error = error;
Vue.prototype.success = success;
Vue.prototype.warning = warning;

/**
 * 成功
 *
 * @param msg
 */
function success(msg) {
    this.$message({
        showClose: true,
        message: msg,
        type: 'success'
    });
}

/**
 * 警告
 *
 * @param msg
 */
function warning(msg) {
    this.$message({
        showClose: true,
        message: msg,
        type: 'warning'
    });
}

/**
 * 错误
 *
 * @param msg
 */
function error(msg) {
    this.$message({
        showClose: true,
        message: msg,
        type: 'error'
    });
}
