<template>
  <div class="dashboard">
    <h1>仪表盘</h1>
    <el-row :gutter="20">
      <el-col :span="6">
        <el-card>
          <div class="card-content">
            <div class="card-icon" style="background: #409eff;">
              <el-icon><User /></el-icon>
            </div>
            <div class="card-info">
              <div class="card-title">用户总数</div>
              <div class="card-value">1,234</div>
            </div>
          </div>
        </el-card>
      </el-col>
      <!-- 更多统计卡片 -->
    </el-row>
  </div>
</template>

<script setup lang="ts">
// 页面逻辑
</script>

<style scoped>
.dashboard {
  padding: 20px;
}

.card-content {
  display: flex;
  align-items: center;
}

.card-icon {
  width: 60px;
  height: 60px;
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-size: 24px;
  margin-right: 15px;
}

.card-title {
  color: #999;
  font-size: 14px;
}

.card-value {
  font-size: 24px;
  font-weight: bold;
  margin-top: 5px;
}
</style>