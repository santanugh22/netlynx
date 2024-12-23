// Need to use the React-specific entry point to import createApi
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

// Define a service using a base URL and expected endpoints
export const staffAndUserApi = createApi({
  reducerPath: "staffAndUserApi",
  baseQuery: fetchBaseQuery({ baseUrl: "https://netlynxs.com/api/" }),
  tagTypes: [
    "User",
    "CardLogin",
    "Staff",
    "StaffLogin",
    "CardSave",
    "StaffDetail",
    "CardDetail",
    "staffImageUpdate",
    "CardImageUpdate",
    "SaveUserVideo",
    "SaveStaffVideo",
    "SaveStaffFile",
    "SaveUserFile",
    "GetUserFile",
    "GetStaffFile",
    "DeleteCardFile",
    "DeleteStaffFile",
    "DeleteSocialMediaLink",
    "DeleteStaffSocialMediaLink",
    "updateStaffSocialMediaLink",
    "UpdateSocialMedia",
    "CardUpdate",
    "StaffUpdate",
    "DeleteReviewLink",
    "SaveSocialMediaLink",
    "SaveStaffSocialMediaLink",
    "SaveStaffReviewLink",
    "SendReviewRequest",
    "UpdateReviewLink",
    "SendStaffResetPasswordLink",
    "SendResetPasswordLink",
    "StaffBackgroundImageUpdate",
    "CardBackgroundImageUpdate",
    "ShareYourContact",
    "DeleteCardVideo",
    "DeleteStaffVideo",
    "UpdateStaffFile",
    "UpdateCardFile",
    "DeleteCard",
  ],
  endpoints: (builder) => ({
    login: builder.mutation<
      unknown,
      { email: string; password: string; role: string }
    >({
      query: ({ email, password, role }) => {
        let formData = new FormData();
        formData.append("email", email);
        formData.append("password", password);
        return {
          url: role === "staff" ? "staff-login" : `card-login`,
          method: "POST",
          headers: {
            "Content-Type": "multipart/form-data",
          },
          body: formData,
        };
      },
      invalidatesTags: ["User", "CardLogin", "Staff", "StaffLogin"],
    }),
    register: builder.mutation<unknown, IRegister>({
      query: (values) => {
        let formData = new FormData();
        formData.append("fname", values.firstName);
        formData.append("lname", values.lastName);
        formData.append("email", values.email);
        formData.append("password", values.password);
        formData.append("user_name", values.userName);
        formData.append("phone", values.phone);
        formData.append("mobile", values.mobile);
        console.log(formData);
        return {
          url: `card-save`,
          method: "POST",
          headers: {
            "Content-Type": "multipart/form-data",
          },
          body: formData,
        };
      },
      invalidatesTags: ["User", "CardSave"],
    }),
    getProfileDetail: builder.query<
      IProfileDetail,
      { auth_key: string; id: string; role: string }
    >({
      query: ({ auth_key, id, role }) => {
        let formData = new FormData();
        formData.append(role === "staff" ? "staff_id" : `card_id`, id);
        return {
          url: role === "staff" ? `staff-detail` : `card-detail`,
          method: "POST",
          headers: {
            "Content-Type": "multipart/form-data",
            Auth_key: auth_key,
          },
          body: formData,
        };
      },
      providesTags: ["Staff", "StaffDetail", "User", "CardDetail"],
    }),
    getContactList: builder.query<any, { id: string; auth_key: string }>({
      query: ({ id, auth_key }) => {
        let formData = new FormData();
        formData.append("staff_id", id);
        return {
          url: `get-share-contact-list`,
          method: "POST",
          headers: {
            "Content-Type": "multipart/form-data",
            Auth_key: auth_key,
          },
          body: formData,
        };
      },
      providesTags: ["Staff", "StaffDetail", "User", "CardDetail"],
    }),
    updateProfileImage: builder.mutation<
      unknown,
      { auth_key: string; id: string; imageURI: string; role: string }
    >({
      query: ({ auth_key, id, imageURI, role }) => {
        let formData = new FormData();
        let imageType = imageURI.substring(imageURI.lastIndexOf(".") + 1);
        formData.append(role === "staff" ? "staff_id" : "card_id", id);
        formData.append("file", {
          uri: imageURI,
          name: `photo${Math.floor(Math.random() * 100)}.${imageType}`,
          filename: `imageName${Math.floor(Math.random() * 100)}.${imageType}`,
          type: `image/${imageType}`,
        } as unknown as File);
        formData.append("Content-Type", `image/${imageType}`);
        return {
          url: role === "staff" ? "staff-image-update" : `card-image-update`,
          method: "POST",
          headers: {
            "Content-Type": "multipart/form-data",
            Auth_key: auth_key,
          },
          body: formData,
        };
      },
      invalidatesTags: ["User", "staffImageUpdate", "Staff", "CardImageUpdate"],
    }),
    saveVideo: builder.mutation<
      { error: boolean; msg: string },
      {
        auth_key: string;
        id: string;
        role: string;
        addVideoInfo: { title: string; url: string };
      }
    >({
      query: ({ auth_key, id, addVideoInfo, role }) => {
        let formData = new FormData();
        formData.append(role === "staff" ? "staff_id" : "card_id", id);
        formData.append("title", addVideoInfo.title);
        formData.append("url", addVideoInfo.url);
        return {
          url: role === "staff" ? "save-staff-video" : `save-card-video`,
          method: "POST",
          headers: {
            "Content-Type": "multipart/form-data",
            Auth_key: auth_key,
          },
          body: formData,
        };
      },
      invalidatesTags: ["User", "SaveUserVideo", "SaveStaffVideo", "Staff"],
    }),
    deleteVideo: builder.mutation<
      { error: boolean; msg: string },
      { auth_key: string; id: string; videoId: string; role: string }
    >({
      query: ({ auth_key, id, videoId, role }) => {
        let formData = new FormData();
        formData.append(role === "staff" ? "staff_id" : "card_id", id);
        formData.append("video_id", videoId);
        return {
          url: role === "staff" ? "delete-staff-video" : `delete-card-video`,
          method: "POST",
          headers: {
            "Content-Type": "multipart/form-data",
            Auth_key: auth_key,
          },
          body: formData,
        };
      },
      invalidatesTags: ["User", "DeleteCardVideo", "DeleteStaffVideo", "Staff"],
    }),
    saveFile: builder.mutation<
      { error: boolean; mgs: string },
      {
        auth_key: string;
        id: string;
        doc: {
          name: string;
          uri: string;
          mimeType: string;
        };
        role: string;
        title: string;
      }
    >({
      query: ({ auth_key, id, doc, role, title }) => {
        let formData = new FormData();
        formData.append(role === "staff" ? "staff_id" : "card_id", id);
        formData.append("title", title);
        formData.append("file", {
          name: doc.name,
          uri: doc.uri,
          type: doc.mimeType,
        } as unknown as File);
        formData.append("Content-Type", `${doc.mimeType}`);
        return {
          url: role === "staff" ? `save-staff-file` : "save-card-file",
          method: "POST",
          headers: {
            "Content-Type": "multipart/form-data",
            Auth_key: auth_key,
          },
          body: formData,
        };
      },
      invalidatesTags: ["Staff", "SaveStaffFile", "SaveUserFile", "User"],
    }),
    getFile: builder.query<
      IFile,
      { auth_key: string; id: string; role: string }
    >({
      query: ({ auth_key, id, role }) => {
        let formData = new FormData();
        formData.append(role === "staff" ? "staff_id" : "card_id", id);
        return {
          url: role === "staff" ? "get-staff-file" : `get-card-file`,
          method: "POST",
          headers: {
            "Content-Type": "multipart/form-data",
            Auth_key: auth_key,
          },
          body: formData,
        };
      },
      providesTags: ["User", "GetUserFile", "GetStaffFile", "Staff"],
    }),
    deleteFile: builder.mutation<
      { error: boolean; msg: string },
      { auth_key: string; id: string; fileId: string | number; role: string }
    >({
      query: ({ auth_key, id, fileId, role }) => {
        let formData = new FormData();
        formData.append(role === "staff" ? "staff_id" : "card_id", id);
        formData.append("file_id", fileId as string);
        return {
          url: role === "staff" ? "delete-staff-file" : `delete-card-file`,
          method: "POST",
          headers: {
            "Content-Type": "multipart/form-data",
            Auth_key: auth_key,
          },
          body: formData,
        };
      },
      invalidatesTags: ["User", "DeleteCardFile", "DeleteStaffFile", "Staff"],
    }),
    deleteSocialMediaLink: builder.mutation<
      { error: boolean; mgs: string },
      {
        auth_key: string;
        id: string;
        linkId: string;
        role: string;
        isMasterSocialMedia: boolean;
      }
    >({
      query: ({ auth_key, id, linkId, role, isMasterSocialMedia }) => {
        let formData = new FormData();
        formData.append(role === "staff" ? "staff_id" : "card_id", id);
        formData.append(isMasterSocialMedia ? "social_id" : "link_id", linkId);
        isMasterSocialMedia && formData.append("url", "");
        return {
          url:
            role === "staff"
              ? "delete-staff-social-media-link"
              : isMasterSocialMedia
              ? "update-user-master-social-media"
              : `delete-social-media-link`,
          method: "POST",
          headers: {
            "Content-Type": "multipart/form-data",
            Auth_key: auth_key,
          },
          body: formData,
        };
      },
      invalidatesTags: [
        "User",
        "DeleteSocialMediaLink",
        "DeleteStaffSocialMediaLink",
        "Staff",
      ],
    }),
    updateSocialMediaLink: builder.mutation<
      { error: boolean; mgs: string },
      {
        auth_key: string;
        id: string;
        title: string;
        url: string;
        role: string;
        socialId: string;
        isMasterSocialMedia: boolean;
      }
    >({
      query: ({
        auth_key,
        id,
        title,
        role,
        url,
        socialId,
        isMasterSocialMedia,
      }) => {
        let formData = new FormData();
        formData.append(role === "staff" ? "staff_id" : "card_id", id);
        formData.append("title", title);
        formData.append("url", url);
        formData.append("social_id", socialId);
        return {
          url:
            role === "staff"
              ? "update-staff-social-media-link"
              : isMasterSocialMedia
              ? "update-user-master-social-media"
              : "update-social-media",
          method: "POST",
          headers: {
            "Content-Type": "multipart/form-data",
            Auth_key: auth_key,
          },
          body: formData,
        };
      },
      invalidatesTags: [
        "User",
        "updateStaffSocialMediaLink",
        "UpdateSocialMedia",
        "User",
      ],
    }),
    updateProfile: builder.mutation<unknown, IPersonalInfo>({
      query: ({
        auth_key,
        id,
        role,
        fname,
        lname,
        email,
        website,
        user_name,
        about,
        phone,
        mobile,
        gender,
        dob,
        address,
        company_name,
        wp_staff_id,
      }) => {
        let formData = new FormData();
        formData.append(
          role === "staff" ? "staff_id" : "card_id",
          id as string
        );
        formData.append("fname", fname);
        formData.append("lname", lname);
        formData.append("email", email);
        formData.append("phone", phone);
        formData.append("mobile", mobile);
        formData.append("website", website);
        formData.append("user_name", user_name);
        formData.append("about", about);
        formData.append("gender", (gender as string) || "");
        formData.append("address", address);
        formData.append("dob", (dob as string) || "");
        formData.append("company_name", company_name);
        role === "staff" &&
          formData.append("wp_staff_id", wp_staff_id as string);
        console.log(formData);
        return {
          url: role === "staff" ? "staff-update" : `card-update`,
          method: "POST",
          headers: {
            "Content-Type": "multipart/form-data",
            Auth_key: auth_key,
          },
          body: formData,
        };
      },
      invalidatesTags: ["User", "CardUpdate", "StaffUpdate", "Staff"],
    }),
    deleteReviewLink: builder.mutation<
      { error: boolean; mgs: string },
      { auth_key: string; id: string; linkId: string }
    >({
      query: ({ auth_key, id, linkId }) => {
        let formData = new FormData();
        formData.append("staff_id", id);
        formData.append("link_id", linkId);

        return {
          url: `delete-review-link`,
          method: "POST",
          headers: {
            "Content-Type": "multipart/form-data",
            Auth_key: auth_key,
          },
          body: formData,
        };
      },
      invalidatesTags: ["Staff", "DeleteReviewLink"],
    }),
    saveSocialMediaLink: builder.mutation<
      unknown,
      {
        auth_key: string;
        id: string;
        imageURI: string;
        socialMediaInfo: { title: string; url: string };
        role: string;
      }
    >({
      query: ({ auth_key, id, imageURI, socialMediaInfo, role }) => {
        let formData = new FormData();
        let imageType = imageURI.substring(imageURI.lastIndexOf(".") + 1);
        formData.append(role === "staff" ? "staff_id" : "card_id", id);
        formData.append("title", socialMediaInfo.title);
        formData.append("url", socialMediaInfo.url);
        formData.append("file", {
          uri: imageURI,
          name: `photo${Math.floor(Math.random() * 100)}.${imageType}`,
          filename: `imageName${Math.floor(Math.random() * 100)}.${imageType}`,
          type: `image/${imageType}`,
        } as unknown as File);
        formData.append("Content-Type", `image/${imageType}`);
        return {
          url:
            role === "staff"
              ? "save-staff-social-media-link"
              : `save-social-media-link`,
          method: "POST",
          headers: {
            "Content-Type": "multipart/form-data",
            Auth_key: auth_key,
          },
          body: formData,
        };
      },
      invalidatesTags: [
        "User",
        "SaveSocialMediaLink",
        "SaveStaffSocialMediaLink",
        "Staff",
      ],
    }),
    saveReviewLink: builder.mutation<
      unknown,
      {
        auth_key: string;
        id: string;
        imageURI: string;
        socialMediaInfo: {
          title: string;
          url: string;
        };
      }
    >({
      query: ({ auth_key, id, imageURI, socialMediaInfo }) => {
        let formData = new FormData();
        let imageType = imageURI.substring(imageURI.lastIndexOf(".") + 1);
        formData.append("staff_id", id);
        formData.append("title", socialMediaInfo.title);
        formData.append("url", socialMediaInfo.url);
        formData.append("file", {
          uri: imageURI,
          name: `photo${Math.floor(Math.random() * 100)}.${imageType}`,
          filename: `imageName${Math.floor(Math.random() * 100)}.${imageType}`,
          type: `image/${imageType}`,
        } as unknown as File);
        formData.append("Content-Type", `image/${imageType}`);

        return {
          url: `save-review-link`,
          method: "POST",
          headers: {
            "Content-Type": "multipart/form-data",
            Auth_key: auth_key,
          },
          body: formData,
        };
      },
      invalidatesTags: ["Staff", "SaveStaffReviewLink"],
    }),
    updateReviewLink: builder.mutation<
      unknown,
      {
        auth_key: string;
        id: string;
        title: string;
        url: string;
        role: string;
        linkId: string;
      }
    >({
      query: ({ auth_key, id, title, role, url, linkId }) => {
        let formData = new FormData();
        formData.append(role === "staff" ? "staff_id" : "card_id", id);
        formData.append("title", title);
        formData.append("url", url);
        formData.append("link_id", linkId);

        return {
          url: `update-review-link`,
          method: "POST",
          headers: {
            "Content-Type": "multipart/form-data",
            Auth_key: auth_key,
          },
          body: formData,
        };
      },
      invalidatesTags: ["Staff", "UpdateReviewLink"],
    }),
    sendReviewRequest: builder.mutation<
      unknown,
      {
        auth_key: string;
        id: string;
        reviewInfo: {
          firstName: string;
          lastName: string;
          phone: string;
          email: string;
        };
      }
    >({
      query: ({ auth_key, id, reviewInfo }) => {
        let formData = new FormData();
        formData.append("staff_id", id);
        formData.append(
          "name",
          reviewInfo.firstName + " " + reviewInfo.lastName
        );
        formData.append("phone", reviewInfo.phone);
        formData.append("email", reviewInfo.email);
        return {
          url: `send-review-request`,
          method: "POST",
          headers: {
            "Content-Type": "multipart/form-data",
            Auth_key: auth_key,
          },
          body: formData,
        };
      },
      invalidatesTags: ["Staff", "SendReviewRequest"],
    }),
    sendResetPasswordLink: builder.mutation<
      { error: boolean; msg: string },
      {
        email: string;
        role: string;
      }
    >({
      query: ({ email, role }) => {
        let formData = new FormData();
        formData.append("email", email);

        return {
          url:
            role === "staff"
              ? "send-staff-reset-password-link"
              : "send-user-reset-password-link",
          method: "POST",
          headers: {
            "Content-Type": "multipart/form-data",
          },
          body: formData,
        };
      },
      invalidatesTags: [
        "User",
        "SendStaffResetPasswordLink",
        "SendResetPasswordLink",
        "Staff",
      ],
    }),
    updateBackgroundImage: builder.mutation<
      unknown,
      { auth_key: string; id: string; imageURI: string; role: string }
    >({
      query: ({ auth_key, id, imageURI, role }) => {
        let formData = new FormData();
        let imageType = imageURI.substring(imageURI.lastIndexOf(".") + 1);
        formData.append(role === "staff" ? "staff_id" : "card_id", id);
        formData.append("file", {
          uri: imageURI,
          name: `photo${Math.floor(Math.random() * 100)}.${imageType}`,
          filename: `imageName${Math.floor(Math.random() * 100)}.${imageType}`,
          type: `image/${imageType}`,
        } as unknown as File);
        formData.append("Content-Type", `image/${imageType}`);
        return {
          url:
            role === "staff"
              ? "staff-background-image-update"
              : `card-background-image-update`,
          method: "POST",
          headers: {
            "Content-Type": "multipart/form-data",
            Auth_key: auth_key,
          },
          body: formData,
        };
      },
      invalidatesTags: [
        "User",
        "StaffBackgroundImageUpdate",
        "Staff",
        "CardBackgroundImageUpdate",
      ],
    }),
    shareYourContact: builder.mutation<
      unknown,
      {
        auth_key: string;
        id: string;
        shareInfo: {
          firstName: string;
          lastName: string;
          phone: string;
          email: string;
          companyName: string;
          jobTitle: string;
        };
        companyId?: string;
      }
    >({
      query: ({ auth_key, id, shareInfo, companyId }) => {
        let formData = new FormData();
        formData.append("staff_id", id);
        formData.append("company_id", companyId as string);
        formData.append("job_title", shareInfo.jobTitle);
        formData.append("fname", shareInfo.firstName);
        formData.append(
          "staff_name",
          shareInfo.firstName + " " + shareInfo.lastName
        );
        formData.append("phone", shareInfo.phone);
        formData.append("email", shareInfo.email);
        formData.append("company_name", shareInfo.companyName);

        return {
          url: `share-your-contact`,
          method: "POST",
          headers: {
            "Content-Type": "multipart/form-data",
            Auth_key: auth_key,
          },
          body: formData,
        };
      },
      invalidatesTags: ["Staff", "ShareYourContact"],
    }),
    updateFile: builder.mutation<
      { error: boolean; msg: string },
      {
        auth_key: string;
        id: string;
        fileId: string;
        title: string;
        role: string;
      }
    >({
      query: ({ auth_key, id, fileId, title, role }) => {
        let formData = new FormData();
        formData.append(role === "sfaff" ? "staff_id" : "card_id", id);
        formData.append("file_id", fileId);
        formData.append("title", title);
        return {
          url: role === "staff" ? "update-staff-file" : `update-card-file`,
          method: "POST",
          headers: {
            "Content-Type": "multipart/form-data",
            Auth_key: auth_key,
          },
          body: formData,
        };
      },
      invalidatesTags: ["Staff", "UpdateStaffFile", "UpdateCardFile", "User"],
    }),
    deleteUser: builder.mutation<unknown, { auth_key: string; id: string }>({
      query: ({ auth_key, id }) => {
        let formData = new FormData();
        formData.append(`card_id`, id);
        return {
          url: `delete-card`,
          method: "POST",
          headers: {
            "Content-Type": "multipart/form-data",
            Auth_key: auth_key,
          },
          body: formData,
        };
      },
      invalidatesTags: ["User", "DeleteCard"],
    }),
  }),
});

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const {
  useLoginMutation,
  useRegisterMutation,
  useGetProfileDetailQuery,
  useGetContactListQuery,
  useUpdateProfileImageMutation,
  useSaveVideoMutation,
  useSaveFileMutation,
  useGetFileQuery,
  useDeleteFileMutation,
  useDeleteSocialMediaLinkMutation,
  useUpdateSocialMediaLinkMutation,
  useUpdateProfileMutation,
  useDeleteReviewLinkMutation,
  useSaveSocialMediaLinkMutation,
  useSaveReviewLinkMutation,
  useSendReviewRequestMutation,
  useUpdateReviewLinkMutation,
  useSendResetPasswordLinkMutation,
  useUpdateBackgroundImageMutation,
  useShareYourContactMutation,
  useDeleteVideoMutation,
  useUpdateFileMutation,
  useDeleteUserMutation,
} = staffAndUserApi;
