import { createRouter, createWebHistory } from "vue-router";
import TheEmulationList from '../../view/emulation-list/EmulationList.vue'
import TheOverview from '../../view/overview/TheOverview.vue'
import TheHomePage from '../../view/home-page/TheHomePage.vue'

const routerList = [
    {path: "/emulation-title", name: "EmualationListRuter", component: TheEmulationList},
    {path: "/overview", name: "OverviewRouter", component: TheOverview},
    {path: "/", name: "HomePage", component: TheHomePage}
]

const router = createRouter({
    history: createWebHistory(), routes: routerList
})

export default router;