<template>
  <el-dialog
    title="纯前端验证"
    :visible.sync="dialogVisible"
    width="360px"
    destroy-on-close
  >
    <div id="jigsaw" />
  </el-dialog>
</template>

<script>
    import '../libs/jigsaw/jigsaw';
    import pic01 from '../assets/images/auth/auth01.jpg';
    import pic02 from '../assets/images/auth/auth02.jpg';
    import pic03 from '../assets/images/auth/auth03.jpg';
    import pic04 from '../assets/images/auth/auth04.jpg';
    import pic05 from '../assets/images/auth/auth05.jpg';
    import pic06 from '../assets/images/auth/auth06.jpg';
    import pic07 from '../assets/images/auth/auth07.jpg';
    import pic08 from '../assets/images/auth/auth08.jpg';
    import pic09 from '../assets/images/auth/auth09.jpg';
    import pic10 from '../assets/images/auth/auth10.jpg';

    let pics = [
        pic01, pic02, pic03, pic04, pic05, pic06, pic07, pic08, pic09, pic10
    ];

    export default {
        data() {
            return {
                dialogVisible: false
            };
        },
        methods: {
            show() {
                this.dialogVisible = true;
                this.$nextTick(function () {
                    let that = this;
                    window.jigsaw.init({
                        pics: pics,
                        el: document.getElementById('jigsaw'),
                        onSuccess: function () {
                            that.dialogVisible = false;
                            that.$emit('success');
                        }
                    });
                });
            }
        }
    };
</script>
