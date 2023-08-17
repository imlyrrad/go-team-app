<template>
  <ClientOnly>
    <div class="h-screen bg-[#F6F9FD] overflow-hidden">
      <!--  Navigation Top-->
      <nav class="h-[55px] bg-white shadow px-5 fixed w-full">
        <div class="flex justify-between items-center h-full">
          <div class="lg:w-4/12 hide-when-tiny">
            <ul>
              <li class="inline-block mr-7 xl:min-w-[110px]">goteam logo</li>
              <li v-for="menu in menus" class="inline-block mr-6 text-gray-500 text-[12px] cursor-pointer">
                {{ menu }}
              </li>
            </ul>
          </div>
          <div class="lg:w-4/12 px-10">
            <div class="search-input flex justify-between border p-1 rounded-full">
              <input type="text" class="flex-auto text-[13px] p-1 mx-1" placeholder="Type for job title or role" />
              <div class="flex items-center bg-blue-700 rounded-full px-3">
                <font-awesome-icon :icon="['fas', 'fa-search']" class="text-[14px] text-white mr-2" />
                <div class="text-[12px] text-white font-light pr-1">Search</div>
              </div>
            </div>
          </div>
          <div class="lg:w-4/12 flex justify-end">
            <div class="flex justify-between">
              <div class="text-right">
                <div class="text-[12px] font-bold text-gray-900">Reyven Biloy</div>
                <div class="text-[11px] font-blue">reyvenb@gmail.com</div>
              </div>
              <div class="w-[60px] flex justify-end items-center cursor-pointer">
                <div class="w-[30px] h-[30px] mr-2 rounded-[30px] avatar border"></div>
                <font-awesome-icon icon="fa-solid fa-chevron-down" class="text-[10px] text-gray-400" />
              </div>
            </div>
          </div>
        </div>
      </nav>
      <!--  Sidebar -->
      <div class="sidebar h-screen fixed mt-[55px] flex justify-end">
        <div class="mt-[40px]">
          <ul>
            <li v-for="link in link1" class="h-[36px] px-2 rounded flex justify-between items-center cursor-pointer hover:bg-gray-100" :class="[link.active && 'bg-gray-100 ']">
              <div>
                <font-awesome-icon :icon="link.icon" class="w-[35px] text-[15px] text-gray-500 mr-1" :class="[link.active && 'font-blue']" />
                <span class="hide-when-tiny text-gray-500 text-[12px]" :class="[link.active && 'font-blue font-medium']">
                  {{ link.label }}
                </span>
              </div>
              <font-awesome-icon v-if="link.active" icon="hide-when-tiny fa-icon fa-chevron-right" class="hide-when-tiny w-[15px] text-[10px] font-blue" />
            </li>
          </ul>
          <div class="border-b my-3"></div>
          <ul class="mb-3">
            <li v-for="link in link2" class="h-[36px] px-2 rounded flex justify-between items-center cursor-pointer hover:bg-gray-100" :class="[link.active && 'bg-gray-100 ']">
              <div>
                <font-awesome-icon :icon="link.icon" class="w-[35px] text-[15px] text-gray-500 mr-1" :class="[link.active && 'font-blue']" />
                <span class="hide-when-tiny text-gray-500 text-[12px]" :class="[link.active && 'font-blue font-medium']">
                  {{ link.label }}
                  <span v-if="link.badge" class="bg-red-400 px-1 text-[11px] ml-1 rounded text-white">
                    {{ link.badge }}
                  </span>
                </span>
              </div>
              <font-awesome-icon v-if="link.active" icon="fa-icon fa-chevron-right" class="w-[15px] text-[10px] font-blue" />
            </li>
          </ul>
          <div class="hide-when-tiny text-[11px] font-gray mb-1 px-4">Copyright 2018 - 2023. All Rights Reserved</div>
          <div class="hide-when-tiny text-[11px] font-blue  px-4">Terms of Use <span class="mx-2">•</span> Privacy Policy</div>
        </div>
      </div>
      <!--  Content-->
      <div class="content mt-[55px] h-screen overflow-y-auto">
        <div class="h-[1000px] xl:w-4/5 lg:w-full sm:mr-5 tiny-mr">
          <section class="mt-5 w-full">
            <div class="bg-white">
              <div class="p-3 border-b pb-4">
                <div class="relative">
                  <div class="absolute top-0 right-0">
                    <div class="flex items-center">
                      <input type="checkbox" class="mr-2" />
                      <span class="text-[11px] mr-5 font-gray"> Don't remind me again </span>
                      <font-awesome-icon icon="fa-icon fa-xmark" class="text-red-400 text-[12px] cursor-pointer" />
                    </div>
                  </div>
                  <div class="font-medium pt-1 px-2">Welcome, Reyven!</div>
                </div>
                <div class="text-[10.5px] text-gray-500 px-2">
                  <span class="text-green-500"> You are almost done!</span>
                  To further strenthen your profile, it is highly recommended for you to complete the 4 section of your application.
                </div>
              </div>
              <div class="flex border-b rounded-b justify-between">
                <div class="lg:w-1/4" v-for="stat in stats">
                  <div class="lg:flex px-3 md:flex sm:flex">
                    <div class="lg:w-3/12">
                      <div class="h-[60px] flex justify-center items-center">
                        <div class="p-[3px] bg-gray-100 rounded-full sm:mr-3">
                          <font-awesome-icon :icon="stat.icon" class="w-[25px] text-[15px] text-gray-500" />
                        </div>
                      </div>
                    </div>
                    <div class="lg:w-9/12">
                      <div class="flex h-full flex-col justify-center">
                        <div class="text-[11px] font-medium mb-[5px]">
                          {{ stat.label }}
                        </div>
                        <div class="lg:flex items-center relative">
                          <div class="lg:w-9/12 bg-gray-200 rounded-full h-[5px] dark:bg-gray-200">
                            <div class="h-[5px] rounded-full" :class="[stat.color]" :style="{ width: `${stat.percent}%` }"></div>
                          </div>
                          <div class="text-[11px] absolute right-0 mb-1" :class="[stat.text]">{{ stat.percent }}%</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <section class="my-5 flex overflow-x-auto">
            <div class="bg-white shadow min-w-[450px] flex-grow mr-4 mb-[100px]">
              <div class="flex border-b">
                <div class="w-3/12 flex justify-center items-center h-[160px] border-r">
                  <div class="h-[100px] w-[100px] rounded-full shadow avatar"></div>
                </div>
                <div class="w-9/12 p-6">
                  <div class="mb-3">
                    <div class="relative font-medium text-[18px]">
                      Reyven S. Biloy
                      <font-awesome-icon :icon="['fas', 'pen']" class="text-[12px] mr-2 text-gray-600 absolute right-0 top-2 cursor-pointer" />
                    </div>
                    <div class="text-[12px] font-medium text-gray-500">UI/UX Designer</div>
                  </div>

                  <div class="flex items-center mb-1">
                    <font-awesome-icon icon="fa-icon fa-graduation-cap" class="text-[13px] mr-2 text-gray-600" />
                    <span class="text-[12px] text-gray-500"> Bachelor of Science in Computer Science </span>
                  </div>

                  <div class="flex">
                    <div class="w-4/12">
                      <font-awesome-icon icon="fa-icon fa-briefcase" class="text-[12px] mr-2 text-gray-600" />
                      <span class="text-[12px] text-gray-500"> 12 years </span>
                    </div>

                    <div class="w-4/12">
                      <font-awesome-icon :icon="['far', 'calendar-check']" class="text-[13px] mr-2 text-gray-600" />
                      <span class="text-[12px] text-gray-500"> Immediately </span>
                    </div>

                    <div class="w-4/12">
                      <font-awesome-icon :icon="['fas', 'dollar']" class="text-[12px] mr-1 text-gray-600" />
                      <span class="text-[12px] text-green-500"> Php 35,000 </span>
                    </div>
                  </div>
                </div>
              </div>

              <div class="px-5 pt-5 pb-2 border-b">
                <div class="flex w-full relative mb-3">
                  <div class="font-medium text-[14px]">General Details</div>
                  <font-awesome-icon :icon="['fas', 'pen']" class="text-[12px] mr-2 text-gray-600 absolute right-0" />
                </div>

                <template v-for="gd in generalDetails">
                  <div class="flex mb-4">
                    <div class="w-4/12 text-gray-500 text-[11px]">
                      {{ gd.label }}
                    </div>
                    <div class="w-8/12 text-[11px]">{{ gd.value }}</div>
                  </div>
                </template>
              </div>

              <div class="px-5 pt-5 pb-2 border-b">
                <div class="flex w-full relative mb-3">
                  <div class="font-medium text-[14px]">Professional Status</div>
                  <font-awesome-icon :icon="['fas', 'pen']" class="text-[12px] mr-2 text-gray-600 absolute right-0 cursor-pointer" />
                </div>

                <template v-for="ps in professionalStatus">
                  <div class="flex mb-5">
                    <div class="w-4/12 text-gray-500 text-[11px]">
                      {{ ps.label }}
                    </div>
                    <div class="w-8/12 text-[11px]">{{ ps.value }}</div>
                  </div>
                </template>
              </div>
              <div class="px-5 pt-5 pb-2 border-b">
                <div class="flex w-full relative mb-3">
                  <div class="font-medium text-[15px]">Preferences Status</div>
                  <font-awesome-icon :icon="['fas', 'pen']" class="text-[12px] mr-2 text-gray-600 absolute right-0 cursor-pointer" />
                </div>

                <template v-for="p in preferences">
                  <div class="flex mb-5">
                    <div class="w-4/12 text-gray-500 text-[11px]">
                      {{ p.label }}
                    </div>
                    <div class="w-8/12 text-[11px]">{{ p.value }}</div>
                  </div>
                </template>
              </div>
            </div>
            <div class="xl:flex xl:flex-row xl:flex-wrap xl:justify-start xl:items-start xl:content-start min-w-[250px] max-w-[250px]">
              <div class="mb-4 md:w-full lg:w-full bg-white shadow rounded">
                <div class="py-2 px-4">
                  <div class="text-[12px] font-medium">Video Introduction</div>
                </div>
                <div class="h-[150px] bg-red-400 flex relative justify-center items-center video">
                  <font-awesome-icon :icon="['fas', 'circle-play']" class="text-white text-[30px] cursor-pointer" />

                  <div class="absolute bottom-2 right-2 bg-black text-white px-2 rounded py-1 text-[10px]">1:55</div>
                </div>
              </div>
              <div class="mb-4 md:w-full lg:w-full bg-white shadow rounded p-3">
                <div class="mb-3">
                  <div class="flex relative">
                    <div class="text-[12px] font-medium text-gray-500 mb-1">Profile Completion</div>
                    <div class="text-[11px] text-green-400 font-medium absolute right-0 mt-1">100%</div>
                  </div>
                  <div>
                    <div class="bg-gray-200 rounded-full h-[6px] dark:bg-gray-200">
                      <div class="h-[6px] rounded-full w-100 bg-green-400"></div>
                    </div>
                  </div>
                </div>
                <div class="">
                  <div class="text-green-500 text-[13px] text-center">Well done, Reyven!</div>
                  <div class="flex justify-center items-center p-2 mb-2">
                    <div class="h-[50px] w-[50px] bg-red-400">
                      <img src="~/assets/images/medal.png" alt="" />
                    </div>
                  </div>
                </div>
                <div class="text-[10px] text-gray-500">You have one of the strongest professional profile in our talent pool. Expect progress on your application at any time soon.</div>
              </div>
              <div class="mb-4 md:w-full lg:w-full bg-white shadow rounded p-3">
                <div class="mb-3">
                  <div class="flex relative mb-1">
                    <div class="text-[12px] font-bold text-gray-500">Profile Completion</div>
                    <div class="text-[11px] text-orange-400 absolute right-0 mt-1">100%</div>
                  </div>
                  <div>
                    <div class="bg-gray-200 rounded-full h-[6px] dark:bg-gray-200">
                      <div class="h-[6px] rounded-full w-100 bg-orange-400 w-[50%]"></div>
                    </div>

                    <div class="flex">
                      <div>
                        <font-awesome-icon :icon="['fas', 'chevron-up']" class="text-[10px] text-gray-500 mr-2" />
                      </div>
                      <div class="flex-auto text-[10px] mt-2 text-gray-500">
                        <div class="mb-2">Hide recommendation</div>
                        <div class="mb-2">
                          Fill-up the following items to strengthen your profile. This can help us matching your profile and increase your changes of landing into your desired role.
                        </div>
                        <ul>
                          <li v-for="recommendation in recommendations" class="mb-2 text-[11px]">
                            <div class="flex">
                              <div>
                                <font-awesome-icon :icon="['far', 'circle']" class="text-[9px] mr-1" />
                              </div>
                              <div class="flex-auto">
                                {{ recommendation.label }}
                                <span class="font-blue">{{ recommendation.bold }}</span>
                              </div>
                            </div>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  </ClientOnly>
</template>

<script setup lang="ts">
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome"

const menus = ["Careers", "Find your Role"]
const link1 = [
  { label: "Profile", icon: ["far", "user"], active: true },
  { label: "Resume / CV", icon: ["far", "file-lines"] },
  { label: "Assessment", icon: ["fas", "chart-line"] },
  { label: "Video Script", icon: ["fas", "display"] },
]
const link2 = [
  { label: "Application Tracking", icon: ["fas", "fa-briefcase"] },
  { label: "Bookmarked", icon: "fa-solid fa-bookmark" },
  { label: "Notification", icon: "fa-regular fa-bell", badge: 2 },
  { label: "Activity Logs", icon: "fa-solid fa-wave-square" },
  { label: "Settings", icon: "fa-solid fa-gear" },
]
const stats = [
  {
    label: "Application Profile",
    icon: ["far", "fa-user"],
    percent: 75,
    color: "bg-orange-300",
    text: "text-orange-400",
  },
  {
    label: "Resume / CV",
    icon: ["far", "fa-file-lines"],
    percent: 50,
    color: "bg-red-400",
    text: "text-red-400",
  },
  {
    label: "Assessment Score",
    icon: ["fas", "chart-line"],
    percent: 0,
    color: "bg-red-400",
    text: "text-red-400",
  },
  {
    label: "Video Introduction",
    icon: ["fas", "display"],
    percent: 0,
    color: "bg-red-400",
    text: "text-red-400",
  },
]
const generalDetails = [
  { label: "Date of Birth", value: "07 July 1986" },
  { label: "Gender", value: "Male" },
  { label: "Civil Status", value: "Married" },
  { label: "Nationality", value: "Filipino" },
]
const professionalStatus = [
  { label: "Recent Job Title", value: "Web Designer and Developer" },
  { label: "Interview Availability", value: "-" },
  { label: "Current Monthly Salary (Gross)", value: "Php 30,000.00" },
  { label: "Allowance (Non-Taxable)", value: "-" },
  { label: "Pre-employment Leaves", value: "07 July - Birthday" },
  { label: "Where can you work?", value: "Office and Home" },
  { label: "Estimate Travel Time to Office", value: "15 mins" },
  { label: "Connection Type", value: "Globe Broadband" },
  { label: "Website / Portfolio", value: "-" },
]
const preferences = [
  { label: "Day Shift", value: "-" },
  { label: "Mid Shift", value: "-" },
  { label: "Night Shift", value: "-" },
  { label: "English Only Policy (EOP)", value: "-" },
  { label: "Where did you hear us?", value: "-" },
  { label: "Marketing Permission", value: "-" },
  { label: "Referral", value: "-" },
]
const recommendations = [
  { label: "Share", bold: "Date of Birth" },
  { label: "Specify", bold: "Current Monthly Salary" },
  { label: "Add one(1)", bold: "Character Reference" },
  { label: "Add atleast five(5) items in", bold: "Other Skills" },
]
</script>

<style scoped lang="scss">
.font {
  &-gray {
    color: #7b8090;
  }

  &-blue {
    color: #3656f5;
  }
}

.avatar {
  background-image: url("~/assets/images/avatar.jpg");
  background-size: cover;
}

.video {
  background-image: url("~/assets/images/video.jpg");
  background-size: cover;
}

input[type="checkbox"] {
  transform: scale(1.2);
}

.search-input {
  :focus {
    outline: none;
  }
}

@media screen and (max-width: 1024px) {
  .sidebar {
    width: 55px;
  }
  .content {
    min-width: 400px;
    margin-left: 70px;
  }
  .hide-when-tiny {
    display: none;
  }
  .show-when-tiny {
    display: none;
  }

  .tiny {
    &-m {
      &r {
        margin-right: 20px;
      }
    }
  }
}

@media screen and (min-width: 1024px) {
  .sidebar {
    width: 250px;
  }
  .content {
    margin-left: 260px;
  }
}

@media screen and (min-width: 1280px) {
  .sidebar {
    width: 340px;
  }
  .content {
    margin-left: 350px;
  }
}

@media screen and (min-width: 1536px) {
  .sidebar {
    width: 440px;
  }
  .content {
    margin-left: 450px;
  }
}
</style>
