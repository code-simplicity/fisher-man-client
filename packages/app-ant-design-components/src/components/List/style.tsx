import { GenerateStyle, useStyle as useAntdStyle } from '../../hooks';
import type { AppProToken } from './typing';

export const genProStyle: GenerateStyle<AppProToken> = (token) => {
  return {
    [`${token.antCls}-pro`]: {
      [`${token.antCls}-form:not(${token.antCls}-form-horizontal)`]: {
        [token.componentCls]: {
          [`&-item:not(${token.componentCls}-item-show-label)`]: {
            [`${token.antCls}-form-item-label`]: {
              display: 'none',
            },
          },
        },
      },
    },
    [token.componentCls]: {
      maxWidth: '100%',
      '&-item': {
        '&&-show-label': {
          [`${token.antCls}-form-item-label`]: {
            display: 'inline-block',
          },
        },
        '&:first-of-type': {
          'div:first-of-type': {
            [`${token.antCls}-form-item`]: {
              [`${token.antCls}-form-item-label`]: {
                display: 'inline-block',
              },
            },
          },
        },
      },
      '&-action': {
        display: 'flex',
        height: '32px',
        marginBlockEnd: '24px',
        lineHeight: '32px',
      },
      '&-action-icon': {
        marginInlineStart: 8,
        cursor: 'pointer',
        transition: 'color 0.3s ease-in-out',
        '&:hover': {
          color: token.colorPrimaryTextHover,
        },
      },
      [`${token.proComponentsCls}-card ${token.proComponentsCls}-card-extra`]: {
        [token.componentCls]: {
          '&-action': {
            marginBlockEnd: 0,
          },
        },
      },
      '&-creator-button-top': {
        marginBlockEnd: 24,
      },
    },
  };
};

/**
 * 自定义返回的useStyle，调用这个hooks返回
 * @param prefixCls
 */
export const useStyle = (prefixCls: string) => {
  return useAntdStyle('AppProFormList', (token) => {
    const proToken: AppProToken = {
      ...token,
      componentCls: `.${prefixCls}`,
    };
    return [genProStyle(proToken)];
  });
};
