import { Button, Upload } from "antd";
import * as React from "react";
import { Mutation } from "react-apollo";
import { withNamespaces, WithNamespaces } from "react-i18next";
import { UPDATE_USER } from "../../graphql/mutations/user";
import { CURRENT_USER_QUERY } from "../../graphql/queries/user";
import styled from "../../styles";

const AvatarTitle = styled.div`
  height: 22px;
  font-size: ${props => props.theme.fontSizeBase};
  color: ${props => props.theme.headingColor};
  line-height: 22px;
  margin-bottom: 8px;
`;

const AvatarWrapper = styled.div`
  width: 144px;
  height: 144px;
  margin-bottom: 12px;
  overflow: hidden;
  img {
    width: 100%;
  }
`;

const ButtonView = styled.div`
  width: 144px;
  text-align: center;
`;

interface IAvatarUploadProps extends WithNamespaces {
  avatarLink?: string;
}

const AvatarUpload: React.FunctionComponent<IAvatarUploadProps> = ({
  avatarLink,
  t
}) => (
  <Mutation
    mutation={UPDATE_USER}
    update={(cache, { data: { user } }) => {
      const { currentUser } = cache.readQuery<any>({
        query: CURRENT_USER_QUERY
      });
      cache.writeQuery({
        query: CURRENT_USER_QUERY,
        data: { todos: currentUser.concat(user) }
      });
    }}
  >
    {(updateUser, { data }) => (
      <>
        <AvatarTitle>{t("avatar")}</AvatarTitle>
        <AvatarWrapper>
          <img
            src={`${process.env.REACT_APP_API_URL}${avatarLink}`}
            alt="avatar"
          />
        </AvatarWrapper>
        <Upload
          fileList={[]}
          beforeUpload={file => {
            updateUser({
              variables: {
                avatar: file
              },
              context: { hasUpload: true }
            });
            return false;
          }}
        >
          <ButtonView>
            <Button icon="upload">{t("updateAvatar")}</Button>
          </ButtonView>
        </Upload>
      </>
    )}
  </Mutation>
);

export default withNamespaces("app.settings")(AvatarUpload);
