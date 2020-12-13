import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
export type Maybe<T> = T | null;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  /** The `Upload` scalar type represents a file upload. */
  Upload: any;
};

export type Query = {
  __typename?: 'Query';
  v: Scalars['String'];
};

export type Mutation = {
  __typename?: 'Mutation';
  createBatchToken: BatchTokenReturn;
  activatePassport: ActivatePassportReturn;
  completeActivation: ActivationCompletionReturn;
};


export type MutationCreateBatchTokenArgs = {
  batchCertificate: Scalars['String'];
  phone?: Maybe<Scalars['String']>;
};


export type MutationActivatePassportArgs = {
  token: Scalars['ID'];
  passportId: Scalars['ID'];
};


export type MutationCompleteActivationArgs = {
  activationId?: Maybe<Scalars['ID']>;
};

export type ActivationCompletionReturn = {
  __typename?: 'ActivationCompletionReturn';
  result: Scalars['String'];
};

export type BatchTokenReturn = {
  __typename?: 'BatchTokenReturn';
  result: Scalars['String'];
  token?: Maybe<Scalars['ID']>;
  batchInfo?: Maybe<BatchInfo>;
};

export type ActivatePassportReturn = {
  __typename?: 'ActivatePassportReturn';
  result: Scalars['String'];
  batchInfo?: Maybe<BatchInfo>;
  headshotURL?: Maybe<Scalars['String']>;
  infoURL?: Maybe<Scalars['String']>;
  activationId?: Maybe<Scalars['ID']>;
};

export type BatchInfo = {
  __typename?: 'BatchInfo';
  uid: Scalars['ID'];
  vaccine: Scalars['String'];
  batchId: Scalars['String'];
  dosesRemaining: Scalars['Int'];
};

export type BatchInfoIn = {
  __typename?: 'BatchInfoIn';
  vaccine: Scalars['String'];
  batchId: Scalars['String'];
  doses: Scalars['Int'];
};

export enum CacheControlScope {
  Public = 'PUBLIC',
  Private = 'PRIVATE'
}


export type CreateBatchTokenMutationVariables = Exact<{
  batchCertificate: Scalars['String'];
}>;


export type CreateBatchTokenMutation = (
  { __typename?: 'Mutation' }
  & { createBatchToken: (
    { __typename?: 'BatchTokenReturn' }
    & Pick<BatchTokenReturn, 'result' | 'token'>
    & { batchInfo?: Maybe<(
      { __typename?: 'BatchInfo' }
      & Pick<BatchInfo, 'uid' | 'vaccine' | 'batchId' | 'dosesRemaining'>
    )> }
  ) }
);

export type ActivatePassportMutationVariables = Exact<{
  token: Scalars['ID'];
  passportId: Scalars['ID'];
}>;


export type ActivatePassportMutation = (
  { __typename?: 'Mutation' }
  & { activatePassport: (
    { __typename?: 'ActivatePassportReturn' }
    & Pick<ActivatePassportReturn, 'result' | 'headshotURL' | 'infoURL' | 'activationId'>
  ) }
);

export type CompleteActivationMutationVariables = Exact<{
  activationId: Scalars['ID'];
}>;


export type CompleteActivationMutation = (
  { __typename?: 'Mutation' }
  & { completeActivation: (
    { __typename?: 'ActivationCompletionReturn' }
    & Pick<ActivationCompletionReturn, 'result'>
  ) }
);


export const CreateBatchTokenDocument = gql`
    mutation CreateBatchToken($batchCertificate: String!) {
  createBatchToken(batchCertificate: $batchCertificate) {
    result
    token
    batchInfo {
      uid
      vaccine
      batchId
      dosesRemaining
    }
  }
}
    `;
export type CreateBatchTokenMutationFn = Apollo.MutationFunction<CreateBatchTokenMutation, CreateBatchTokenMutationVariables>;

/**
 * __useCreateBatchTokenMutation__
 *
 * To run a mutation, you first call `useCreateBatchTokenMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateBatchTokenMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createBatchTokenMutation, { data, loading, error }] = useCreateBatchTokenMutation({
 *   variables: {
 *      batchCertificate: // value for 'batchCertificate'
 *   },
 * });
 */
export function useCreateBatchTokenMutation(baseOptions?: Apollo.MutationHookOptions<CreateBatchTokenMutation, CreateBatchTokenMutationVariables>) {
        return Apollo.useMutation<CreateBatchTokenMutation, CreateBatchTokenMutationVariables>(CreateBatchTokenDocument, baseOptions);
      }
export type CreateBatchTokenMutationHookResult = ReturnType<typeof useCreateBatchTokenMutation>;
export type CreateBatchTokenMutationResult = Apollo.MutationResult<CreateBatchTokenMutation>;
export type CreateBatchTokenMutationOptions = Apollo.BaseMutationOptions<CreateBatchTokenMutation, CreateBatchTokenMutationVariables>;
export const ActivatePassportDocument = gql`
    mutation ActivatePassport($token: ID!, $passportId: ID!) {
  activatePassport(token: $token, passportId: $passportId) {
    result
    headshotURL
    infoURL
    activationId
  }
}
    `;
export type ActivatePassportMutationFn = Apollo.MutationFunction<ActivatePassportMutation, ActivatePassportMutationVariables>;

/**
 * __useActivatePassportMutation__
 *
 * To run a mutation, you first call `useActivatePassportMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useActivatePassportMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [activatePassportMutation, { data, loading, error }] = useActivatePassportMutation({
 *   variables: {
 *      token: // value for 'token'
 *      passportId: // value for 'passportId'
 *   },
 * });
 */
export function useActivatePassportMutation(baseOptions?: Apollo.MutationHookOptions<ActivatePassportMutation, ActivatePassportMutationVariables>) {
        return Apollo.useMutation<ActivatePassportMutation, ActivatePassportMutationVariables>(ActivatePassportDocument, baseOptions);
      }
export type ActivatePassportMutationHookResult = ReturnType<typeof useActivatePassportMutation>;
export type ActivatePassportMutationResult = Apollo.MutationResult<ActivatePassportMutation>;
export type ActivatePassportMutationOptions = Apollo.BaseMutationOptions<ActivatePassportMutation, ActivatePassportMutationVariables>;
export const CompleteActivationDocument = gql`
    mutation CompleteActivation($activationId: ID!) {
  completeActivation(activationId: $activationId) {
    result
  }
}
    `;
export type CompleteActivationMutationFn = Apollo.MutationFunction<CompleteActivationMutation, CompleteActivationMutationVariables>;

/**
 * __useCompleteActivationMutation__
 *
 * To run a mutation, you first call `useCompleteActivationMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCompleteActivationMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [completeActivationMutation, { data, loading, error }] = useCompleteActivationMutation({
 *   variables: {
 *      activationId: // value for 'activationId'
 *   },
 * });
 */
export function useCompleteActivationMutation(baseOptions?: Apollo.MutationHookOptions<CompleteActivationMutation, CompleteActivationMutationVariables>) {
        return Apollo.useMutation<CompleteActivationMutation, CompleteActivationMutationVariables>(CompleteActivationDocument, baseOptions);
      }
export type CompleteActivationMutationHookResult = ReturnType<typeof useCompleteActivationMutation>;
export type CompleteActivationMutationResult = Apollo.MutationResult<CompleteActivationMutation>;
export type CompleteActivationMutationOptions = Apollo.BaseMutationOptions<CompleteActivationMutation, CompleteActivationMutationVariables>;