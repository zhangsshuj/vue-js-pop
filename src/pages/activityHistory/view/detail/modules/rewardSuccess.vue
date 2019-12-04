<!-- 【奖励已发放】模版 -->
<template>
  <section class='template-detail template-detail-1'>
    <div class="detail-container">
      <div class="header">
        <p class="row row-title-1">
          <span class="label">{{orderData.activityName}}</span>
          <!-- 失败原因 根据条件展示 -->
          <span class="value">{{$orderStatus[orderData.orderStatus]}}<span class="fail" v-show="orderData.orderStatus=='0' || orderData.orderStatus=='2'"><i v-show="orderData.orderStatusReason">：{{orderData.orderStatusReason}}</i></span></span>
        </p>
      </div>
      <div class="content">
        <p class="row"><span class="label">产品名称：</span><span class="value">{{orderData.prdName}}</span></p>
        <p class="row"><span class="label">银行：</span><span class="value">{{orderData.orgName}}</span></p>
        <p class="row"><span class="label">购买金额：</span><span class="value">￥{{orderData.teadeAmount || 0}}</span></p>
        <p class="row"><span class="label">活动计息金额：</span><span class="value">￥{{orderData.amountToLimit || 0}}</span></p>

        <p class="row" v-if="orderData.additionalIncome"><span class="label">活动额外收益：</span><span class="value">+{{orderData.additionalIncome}}</span></p>
        <p class="row" v-if="orderData.ratePeriod"><span class="label">活动加息天数：</span><span class="value">{{orderData.ratePeriod || 0}}天</span></p>
        <p class="row" v-if="orderData.assistanceDay"><span class="label">活动助力天数：</span><span class="value">{{orderData.assistanceDay || 0}}天</span></p>
        <p class="row" v-if="(orderData.ratePeriod + orderData.assistanceDay) && orderData.assistanceDay"><span class="label">总加息天数：</span><span class="value">{{orderData.ratePeriod + orderData.assistanceDay}}天</span></p>
        <p class="row" v-if="orderData.totalNumbers"><span class="label">人数：</span><span class="value">{{orderData.totalNumbers || 0}}人团</span></p>
        <p class="row" v-if="orderData.flowCreateTime"><span class="label">投资时间：</span><span class="value">{{orderData.flowCreateTime | formatTime("Y年M月D日 h:m分")}}</span></p>
        <p class="row" v-if="orderData.reckonReteTime"><span class="label">计息时间：</span><span class="value">{{orderData.reckonReteTime | formatTime("Y年M月D日 h:m分")}}</span></p>
      </div>
      <div class="footer">
        <p class="row row-title-2" v-if="orderData.incomeAmount"><span class="label">预计收益金额</span><span class="value">￥{{orderData.incomeAmount}}</span></p>
        <p class="row" v-if="orderData.realTime"><span class="label">收益预计到账时间：</span><span class="value">{{orderData.realTime | formatTime("Y年M月D日 h:m分")}}</span></p>
        <p class="row" v-if="orderData.prizeName"><span class="label">奖品：</span><span class="value">{{orderData.prizeName}}</span></p>
        <p class="row" v-if="orderData.prizeSerialNum"><span class="label">序列号：</span><span class="value">{{orderData.prizeSerialNum}}</span></p>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  props: {
    orderData: {
      type: Object,
      default () { return {} }
    }
  }
}
</script>
<style lang='less' scoped>
@import url(./template.less);
</style>