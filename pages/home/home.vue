<template>
  <view>
    <!-- 使用自定义的搜索组件 -->
    <view class="search-box">
      <my-search @click="gotoSearch"></my-search>
    </view>
    <!-- 轮播图区域 -->
    <swiper :indicator-dots="true" :autoplay="true" :interval="3000" :duration="1000" :circular="true">
      <swiper-item v-for="(item, i) in swiperList" :key="i">
        <navigator class="swiper-item" :url="'/subpkg/goods_detail/goods_detail?goods_id=' + item.goods_id"
          :open-type="item.open_type">
          <image :src="item.image_src"></image>
        </navigator>
      </swiper-item>
    </swiper>
    <!-- 分类导航区 -->
    <view class="nav-list">
      <view class="nav-item" v-for="(item, index) in navList" :key="index" @click="navClickHandler(item)">
        <image :src="item.image_src" class="nav-img"></image>
      </view>
    </view>
    <view class="floor-list">
      <!-- 楼层item -->
      <view class="floor-item" v-for="(item, index) in floorList" :key="index">
        <image :src="item.floor_title.image_src" class="floor-title"></image>
        <!-- 楼层图片区域 -->
        <view class="floor-img-box">
          <!-- 左侧大图片的盒子 -->
          <navigator class="left-img-box" :url="item.product_list[0].url">
            <image :src="item.product_list[0].image_src" :style="{width: item.product_list[0].image_width + 'rpx'}"
              mode="widthFix"></image>
          </navigator>
          <!-- 右侧 4 个小图片的盒子 -->
          <view class="right-img-box">
            <navigator class="right-img-item" v-for="(item2, i2) in item.product_list" :key="i2" v-if="i2 !== 0"
              :url="item2.url">
              <image :src="item2.image_src" mode="widthFix" :style="{width: item2.image_width + 'rpx'}"></image>
            </navigator>
          </view>
        </view>
      </view>

    </view>
  </view>
</template>

<script>
  import badgeMix from '@/mixins/tabbar-badge.js'
  export default {
    mixins:[badgeMix],
    data() {
      return {
        // 轮播图数据列表，默认为空数组
        swiperList: [],
        // 分类导航的数据列表
        navList: [],
        // 楼层数据列表
        floorList: []
      };
    },
    onLoad() {
      // 页面刚加载，调用获取轮播图数据的方法
      this.getSwiperList()
      // 调用获取分类导航数据的方法
      this.getNavList()
      // 调用湖区楼层数据的方法
      this.getFloorList()
    },
    methods: {
      // 获取轮播图数据的方法
      async getSwiperList() {
        // 发请求
        const {
          data: res
        } = await uni.$http.get('/api/public/v1/home/swiperdata')

        // 请求失败的处理
        if (res.meta.status !== 200) {
          return uni.$showMsg()
        }
        // 请求成功
        this.swiperList = res.message
      },
      // 获取分类导航数据的方法
      async getNavList() {
        const {
          data: res
        } = await uni.$http.get('/api/public/v1/home/catitems')
        if (res.meta.status !== 200) return uni.$showMsg()
        this.navList = res.message
      },
      // 分类导航的点击事件
      navClickHandler(item) {
        // 判断点击的是哪个分类
        if (item.name === '分类') {
          uni.switchTab({
            url: '/pages/cate/cate'
          })
        }
      },
      // 楼层数据获取方法
      async getFloorList() {
        const {
          data: res
        } = await uni.$http.get('/api/public/v1/home/floordata')
        if (res.meta.status !== 200) return uni.$showMsg()
        this.floorList = res.message
      },
      gotoSearch() {
        uni.navigateTo({
          url: '/subpkg/search/search'
        })
      }
    }
  }
</script>

<style lang="scss">
  .search-box {
    // 设置定位效果为“吸顶”
    position: sticky;
    // 吸顶的“位置”
    top: 0;
    // 提高层级，防止被轮播图覆盖    
    z-index: 999;
  }
  swiper {
    height: 330rpx;

    .swiper-item,
    image {
      width: 100%;
      height: 100%;
    }
  }

  .nav-list {
    display: flex;
    justify-content: space-around;
    margin: 15px 0;

    .nav-img {
      width: 128rpx;
      height: 140rpx;
    }
  }

  .floor-item {
    display: flex;
    flex-direction: column;

    .floor-title {
      height: 60rpx;
      width: 100%;

    }

    .floor-img-box {
      display: flex;
      padding-left: 10rpx;

      .right-img-box {
        display: flex;
        flex-wrap: wrap;
        justify-content: space-around;
      }
    }

    

  }
</style>
