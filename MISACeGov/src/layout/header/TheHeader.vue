<template>
    <div class="header">
        <div class="header_left">
            <div class="nav-app-content">
                <div class="nav-icon nav-app"></div>
            </div>
            <div class="nav-logo-content">
                <router-link to="/" class="nav-logo nav-app-logo"></router-link>
                <div class="logo-title">MISA CeGov</div>
            </div>
        </div>
        <div class="header_space"></div>
        <div class="header_right">
            <m-icon type="notice"></m-icon>
            <m-icon type="help"></m-icon>
            <m-icon type="otheraction"></m-icon>
            <m-icon type="document"></m-icon>
            <m-icon type="setting"></m-icon>
            <div class="header_right-icon nav-logo nav-logo-user"></div>
        </div>
    </div>
</template>

<script>
export default {
    name: "TheHeader",
    components: {

    }
}
</script>

<style>
@import './the-header.css';
@import '../../components/icon/misa-logo.css';
@import '../../css/main.css';
</style>