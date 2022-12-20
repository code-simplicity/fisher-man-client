import { FC, ReactNode } from 'react';
import { injectIntl } from '@@/plugin-locale';
import { ComponentsProps } from '../../type';
import { Card, Col, Row } from 'antd';

interface AppCardProps extends ComponentsProps {
  children?: ReactNode;
  cardTitle?: string;
  rowGutter?: number;
  colSpan?: number;
}

// 卡片容器
const AppCard: FC<AppCardProps> = (props) => {
  const { intl, children, cardTitle, rowGutter, colSpan } = props;
  return (
    <>
      <Row gutter={rowGutter}>
        <Col span={colSpan}>
          <Card title={cardTitle}>{children}</Card>
        </Col>
      </Row>
    </>
  );
};

export default injectIntl(AppCard);
