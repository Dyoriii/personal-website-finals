<template>
  <div class="profile-container">
    <div class="profile-card" v-if="profile">

      <div class="avatar-section">
        <div class="avatar" v-if="profile.avatar_url">
          <img :src="profile.avatar_url" alt="Avatar" />
        </div>
        <div class="avatar placeholder" v-else>
          {{ initials }}
        </div>
        <h2 class="name">{{ profile.name }}</h2>
        <p class="title">{{ profile.title }}</p>
      </div>

      <div class="bio-section" v-if="profile.bio">
        <p class="bio">{{ profile.bio }}</p>
      </div>

      <div class="skills-section" v-if="profile.skills && profile.skills.length">
        <h3>Skills</h3>
        <div class="skills-list">
          <span class="skill-tag" v-for="skill in profile.skills" :key="skill">
            {{ skill }}
          </span>
        </div>
      </div>

      <div class="contact">
        <h3>Contact</h3>
        <p v-if="profile.email">📧 {{ profile.email }}</p>
        <p v-if="profile.github_url">
          <a :href="profile.github_url" target="_blank">🐙 GitHub</a>
        </p>
        <p v-if="profile.linkedin_url">
          <a :href="profile.linkedin_url" target="_blank">💼 LinkedIn</a>
        </p>
      </div>

    </div>
    <div v-else class="loading">Loading profile...</div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue';
import { profileAPI } from '../services/api';

const profile = ref<any>(null);

const initials = computed(() => {
  if (!profile.value?.name) return '?';
  return profile.value.name
    .split(' ')
    .map((n: string) => n[0])
    .join('')
    .toUpperCase();
});

onMounted(async () => {
  try {
    const response = await profileAPI.getProfile();
    profile.value = response.data;
    console.log('Profile loaded:', profile.value);
  } catch (error) {
    console.error('Failed to load profile:', error);
  }
});
</script>

<style scoped>
.profile-container {
  max-width: 600px;
  margin: 0 auto;
  padding: 20px;
}

.profile-card {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  border-radius: 10px;
  padding: 30px;
  color: white;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
}

/* Avatar */
.avatar-section {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 20px;
}

.avatar {
  width: 90px;
  height: 90px;
  border-radius: 50%;
  overflow: hidden;
  border: 3px solid rgba(255, 255, 255, 0.5);
  margin-bottom: 12px;
}

.avatar img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.avatar.placeholder {
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(255, 255, 255, 0.2);
  font-size: 28px;
  font-weight: bold;
  letter-spacing: 1px;
}

.name {
  margin: 0 0 4px;
  font-size: 24px;
  font-weight: 700;
}

.title {
  margin: 0;
  font-size: 14px;
  opacity: 0.85;
  letter-spacing: 0.5px;
}

/* Bio */
.bio-section {
  background: rgba(0, 0, 0, 0.15);
  border-radius: 8px;
  padding: 14px 16px;
  margin-bottom: 20px;
}

.bio {
  margin: 0;
  font-size: 14px;
  line-height: 1.6;
  opacity: 0.9;
}

/* Skills */
.skills-section {
  margin-bottom: 20px;
}

.skills-section h3 {
  margin: 0 0 10px;
  font-size: 14px;
  text-transform: uppercase;
  letter-spacing: 1px;
  opacity: 0.75;
}

.skills-list {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
}

.skill-tag {
  background: rgba(255, 255, 255, 0.2);
  border: 1px solid rgba(255, 255, 255, 0.35);
  border-radius: 20px;
  padding: 4px 12px;
  font-size: 13px;
}

/* Contact */
.contact {
  margin-top: 20px;
  padding-top: 20px;
  border-top: 1px solid rgba(255, 255, 255, 0.3);
}

.contact h3 {
  margin: 0 0 10px;
  font-size: 14px;
  text-transform: uppercase;
  letter-spacing: 1px;
  opacity: 0.75;
}

.contact p {
  margin: 8px 0;
  font-size: 14px;
}

.contact a {
  color: white;
  text-decoration: none;
  opacity: 0.9;
}

.contact a:hover {
  text-decoration: underline;
}

/* Loading */
.loading {
  text-align: center;
  padding: 40px;
  color: #666;
}
</style>