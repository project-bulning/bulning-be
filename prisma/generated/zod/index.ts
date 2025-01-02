import { z } from 'zod';
import type { Prisma } from '@prisma/client';

/////////////////////////////////////////
// HELPER FUNCTIONS
/////////////////////////////////////////


/////////////////////////////////////////
// ENUMS
/////////////////////////////////////////

export const TransactionIsolationLevelSchema = z.enum(['ReadUncommitted','ReadCommitted','RepeatableRead','Serializable']);

export const BugReportScalarFieldEnumSchema = z.enum(['id','latitude','longitude','user_id','bug_image_url','bug_type','bug_size','equipment','price','note','created_at','status','title']);

export const ChatScalarFieldEnumSchema = z.enum(['id','match_id','status','created_at','blocked_at']);

export const MatchScalarFieldEnumSchema = z.enum(['id','bug_report_id','helper_id','hunter_id','status','created_at','accepted_at','rejected_at']);

export const UserReviewScalarFieldEnumSchema = z.enum(['id','user_id','role','score','time_taken','price','review_note','created_at']);

export const UserScalarFieldEnumSchema = z.enum(['id','kakao_id','name','phone_number','location','gender','role','hunt_count','age_group','email','password','created_at','updated_at','terms_accepted']);

export const SortOrderSchema = z.enum(['asc','desc']);

export const NullsOrderSchema = z.enum(['first','last']);
/////////////////////////////////////////
// MODELS
/////////////////////////////////////////

/////////////////////////////////////////
// BUG REPORT SCHEMA
/////////////////////////////////////////

export const BugReportSchema = z.object({
  id: z.number().int(),
  latitude: z.number(),
  longitude: z.number(),
  user_id: z.number().int(),
  bug_image_url: z.string().nullable(),
  bug_type: z.string().nullable(),
  bug_size: z.string().nullable(),
  equipment: z.string().nullable(),
  price: z.string().nullable(),
  note: z.string().nullable(),
  created_at: z.coerce.date().nullable(),
  status: z.string().nullable(),
  title: z.string().nullable(),
})

export type BugReport = z.infer<typeof BugReportSchema>

/////////////////////////////////////////
// CHAT SCHEMA
/////////////////////////////////////////

export const ChatSchema = z.object({
  id: z.number().int(),
  match_id: z.number().int().nullable(),
  status: z.string().nullable(),
  created_at: z.coerce.date().nullable(),
  blocked_at: z.coerce.date().nullable(),
})

export type Chat = z.infer<typeof ChatSchema>

/////////////////////////////////////////
// MATCH SCHEMA
/////////////////////////////////////////

export const MatchSchema = z.object({
  id: z.number().int(),
  bug_report_id: z.number().int().nullable(),
  helper_id: z.number().int(),
  hunter_id: z.number().int(),
  status: z.string().nullable(),
  created_at: z.coerce.date().nullable(),
  accepted_at: z.coerce.date().nullable(),
  rejected_at: z.coerce.date().nullable(),
})

export type Match = z.infer<typeof MatchSchema>

/////////////////////////////////////////
// USER REVIEW SCHEMA
/////////////////////////////////////////

export const UserReviewSchema = z.object({
  id: z.number().int(),
  user_id: z.number().int(),
  role: z.string().nullable(),
  score: z.number().int().nullable(),
  time_taken: z.number().int().nullable(),
  price: z.number().int().nullable(),
  review_note: z.string().nullable(),
  created_at: z.coerce.date().nullable(),
})

export type UserReview = z.infer<typeof UserReviewSchema>

/////////////////////////////////////////
// USER SCHEMA
/////////////////////////////////////////

export const UserSchema = z.object({
  id: z.number().int(),
  kakao_id: z.string(),
  name: z.string().nullable(),
  phone_number: z.string().nullable(),
  location: z.string().nullable(),
  gender: z.string().nullable(),
  role: z.string().nullable(),
  hunt_count: z.number().int().nullable(),
  age_group: z.string().nullable(),
  email: z.string().nullable(),
  password: z.string().nullable(),
  created_at: z.coerce.date().nullable(),
  updated_at: z.coerce.date().nullable(),
  terms_accepted: z.number().int().nullable(),
})

export type User = z.infer<typeof UserSchema>

/////////////////////////////////////////
// SELECT & INCLUDE
/////////////////////////////////////////

// BUG REPORT
//------------------------------------------------------

export const BugReportIncludeSchema: z.ZodType<Prisma.BugReportInclude> = z.object({
  user: z.union([z.boolean(),z.lazy(() => UserArgsSchema)]).optional(),
  matches: z.union([z.boolean(),z.lazy(() => MatchFindManyArgsSchema)]).optional(),
  _count: z.union([z.boolean(),z.lazy(() => BugReportCountOutputTypeArgsSchema)]).optional(),
}).strict()

export const BugReportArgsSchema: z.ZodType<Prisma.BugReportDefaultArgs> = z.object({
  select: z.lazy(() => BugReportSelectSchema).optional(),
  include: z.lazy(() => BugReportIncludeSchema).optional(),
}).strict();

export const BugReportCountOutputTypeArgsSchema: z.ZodType<Prisma.BugReportCountOutputTypeDefaultArgs> = z.object({
  select: z.lazy(() => BugReportCountOutputTypeSelectSchema).nullish(),
}).strict();

export const BugReportCountOutputTypeSelectSchema: z.ZodType<Prisma.BugReportCountOutputTypeSelect> = z.object({
  matches: z.boolean().optional(),
}).strict();

export const BugReportSelectSchema: z.ZodType<Prisma.BugReportSelect> = z.object({
  id: z.boolean().optional(),
  latitude: z.boolean().optional(),
  longitude: z.boolean().optional(),
  user_id: z.boolean().optional(),
  bug_image_url: z.boolean().optional(),
  bug_type: z.boolean().optional(),
  bug_size: z.boolean().optional(),
  equipment: z.boolean().optional(),
  price: z.boolean().optional(),
  note: z.boolean().optional(),
  created_at: z.boolean().optional(),
  status: z.boolean().optional(),
  title: z.boolean().optional(),
  user: z.union([z.boolean(),z.lazy(() => UserArgsSchema)]).optional(),
  matches: z.union([z.boolean(),z.lazy(() => MatchFindManyArgsSchema)]).optional(),
  _count: z.union([z.boolean(),z.lazy(() => BugReportCountOutputTypeArgsSchema)]).optional(),
}).strict()

// CHAT
//------------------------------------------------------

export const ChatIncludeSchema: z.ZodType<Prisma.ChatInclude> = z.object({
  match: z.union([z.boolean(),z.lazy(() => MatchArgsSchema)]).optional(),
}).strict()

export const ChatArgsSchema: z.ZodType<Prisma.ChatDefaultArgs> = z.object({
  select: z.lazy(() => ChatSelectSchema).optional(),
  include: z.lazy(() => ChatIncludeSchema).optional(),
}).strict();

export const ChatSelectSchema: z.ZodType<Prisma.ChatSelect> = z.object({
  id: z.boolean().optional(),
  match_id: z.boolean().optional(),
  status: z.boolean().optional(),
  created_at: z.boolean().optional(),
  blocked_at: z.boolean().optional(),
  match: z.union([z.boolean(),z.lazy(() => MatchArgsSchema)]).optional(),
}).strict()

// MATCH
//------------------------------------------------------

export const MatchIncludeSchema: z.ZodType<Prisma.MatchInclude> = z.object({
  chats: z.union([z.boolean(),z.lazy(() => ChatFindManyArgsSchema)]).optional(),
  bug_report: z.union([z.boolean(),z.lazy(() => BugReportArgsSchema)]).optional(),
  hunter: z.union([z.boolean(),z.lazy(() => UserArgsSchema)]).optional(),
  helper: z.union([z.boolean(),z.lazy(() => UserArgsSchema)]).optional(),
  _count: z.union([z.boolean(),z.lazy(() => MatchCountOutputTypeArgsSchema)]).optional(),
}).strict()

export const MatchArgsSchema: z.ZodType<Prisma.MatchDefaultArgs> = z.object({
  select: z.lazy(() => MatchSelectSchema).optional(),
  include: z.lazy(() => MatchIncludeSchema).optional(),
}).strict();

export const MatchCountOutputTypeArgsSchema: z.ZodType<Prisma.MatchCountOutputTypeDefaultArgs> = z.object({
  select: z.lazy(() => MatchCountOutputTypeSelectSchema).nullish(),
}).strict();

export const MatchCountOutputTypeSelectSchema: z.ZodType<Prisma.MatchCountOutputTypeSelect> = z.object({
  chats: z.boolean().optional(),
}).strict();

export const MatchSelectSchema: z.ZodType<Prisma.MatchSelect> = z.object({
  id: z.boolean().optional(),
  bug_report_id: z.boolean().optional(),
  helper_id: z.boolean().optional(),
  hunter_id: z.boolean().optional(),
  status: z.boolean().optional(),
  created_at: z.boolean().optional(),
  accepted_at: z.boolean().optional(),
  rejected_at: z.boolean().optional(),
  chats: z.union([z.boolean(),z.lazy(() => ChatFindManyArgsSchema)]).optional(),
  bug_report: z.union([z.boolean(),z.lazy(() => BugReportArgsSchema)]).optional(),
  hunter: z.union([z.boolean(),z.lazy(() => UserArgsSchema)]).optional(),
  helper: z.union([z.boolean(),z.lazy(() => UserArgsSchema)]).optional(),
  _count: z.union([z.boolean(),z.lazy(() => MatchCountOutputTypeArgsSchema)]).optional(),
}).strict()

// USER REVIEW
//------------------------------------------------------

export const UserReviewIncludeSchema: z.ZodType<Prisma.UserReviewInclude> = z.object({
  user: z.union([z.boolean(),z.lazy(() => UserArgsSchema)]).optional(),
}).strict()

export const UserReviewArgsSchema: z.ZodType<Prisma.UserReviewDefaultArgs> = z.object({
  select: z.lazy(() => UserReviewSelectSchema).optional(),
  include: z.lazy(() => UserReviewIncludeSchema).optional(),
}).strict();

export const UserReviewSelectSchema: z.ZodType<Prisma.UserReviewSelect> = z.object({
  id: z.boolean().optional(),
  user_id: z.boolean().optional(),
  role: z.boolean().optional(),
  score: z.boolean().optional(),
  time_taken: z.boolean().optional(),
  price: z.boolean().optional(),
  review_note: z.boolean().optional(),
  created_at: z.boolean().optional(),
  user: z.union([z.boolean(),z.lazy(() => UserArgsSchema)]).optional(),
}).strict()

// USER
//------------------------------------------------------

export const UserIncludeSchema: z.ZodType<Prisma.UserInclude> = z.object({
  bug_reports: z.union([z.boolean(),z.lazy(() => BugReportFindManyArgsSchema)]).optional(),
  hunter_matches: z.union([z.boolean(),z.lazy(() => MatchFindManyArgsSchema)]).optional(),
  helper_matches: z.union([z.boolean(),z.lazy(() => MatchFindManyArgsSchema)]).optional(),
  user_reviews: z.union([z.boolean(),z.lazy(() => UserReviewFindManyArgsSchema)]).optional(),
  _count: z.union([z.boolean(),z.lazy(() => UserCountOutputTypeArgsSchema)]).optional(),
}).strict()

export const UserArgsSchema: z.ZodType<Prisma.UserDefaultArgs> = z.object({
  select: z.lazy(() => UserSelectSchema).optional(),
  include: z.lazy(() => UserIncludeSchema).optional(),
}).strict();

export const UserCountOutputTypeArgsSchema: z.ZodType<Prisma.UserCountOutputTypeDefaultArgs> = z.object({
  select: z.lazy(() => UserCountOutputTypeSelectSchema).nullish(),
}).strict();

export const UserCountOutputTypeSelectSchema: z.ZodType<Prisma.UserCountOutputTypeSelect> = z.object({
  bug_reports: z.boolean().optional(),
  hunter_matches: z.boolean().optional(),
  helper_matches: z.boolean().optional(),
  user_reviews: z.boolean().optional(),
}).strict();

export const UserSelectSchema: z.ZodType<Prisma.UserSelect> = z.object({
  id: z.boolean().optional(),
  kakao_id: z.boolean().optional(),
  name: z.boolean().optional(),
  phone_number: z.boolean().optional(),
  location: z.boolean().optional(),
  gender: z.boolean().optional(),
  role: z.boolean().optional(),
  hunt_count: z.boolean().optional(),
  age_group: z.boolean().optional(),
  email: z.boolean().optional(),
  password: z.boolean().optional(),
  created_at: z.boolean().optional(),
  updated_at: z.boolean().optional(),
  terms_accepted: z.boolean().optional(),
  bug_reports: z.union([z.boolean(),z.lazy(() => BugReportFindManyArgsSchema)]).optional(),
  hunter_matches: z.union([z.boolean(),z.lazy(() => MatchFindManyArgsSchema)]).optional(),
  helper_matches: z.union([z.boolean(),z.lazy(() => MatchFindManyArgsSchema)]).optional(),
  user_reviews: z.union([z.boolean(),z.lazy(() => UserReviewFindManyArgsSchema)]).optional(),
  _count: z.union([z.boolean(),z.lazy(() => UserCountOutputTypeArgsSchema)]).optional(),
}).strict()


/////////////////////////////////////////
// INPUT TYPES
/////////////////////////////////////////

export const BugReportWhereInputSchema: z.ZodType<Prisma.BugReportWhereInput> = z.object({
  AND: z.union([ z.lazy(() => BugReportWhereInputSchema),z.lazy(() => BugReportWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => BugReportWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => BugReportWhereInputSchema),z.lazy(() => BugReportWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => IntFilterSchema),z.number() ]).optional(),
  latitude: z.union([ z.lazy(() => FloatFilterSchema),z.number() ]).optional(),
  longitude: z.union([ z.lazy(() => FloatFilterSchema),z.number() ]).optional(),
  user_id: z.union([ z.lazy(() => IntFilterSchema),z.number() ]).optional(),
  bug_image_url: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  bug_type: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  bug_size: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  equipment: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  price: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  note: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  created_at: z.union([ z.lazy(() => DateTimeNullableFilterSchema),z.coerce.date() ]).optional().nullable(),
  status: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  title: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  user: z.union([ z.lazy(() => UserRelationFilterSchema),z.lazy(() => UserWhereInputSchema) ]).optional(),
  matches: z.lazy(() => MatchListRelationFilterSchema).optional()
}).strict();

export const BugReportOrderByWithRelationInputSchema: z.ZodType<Prisma.BugReportOrderByWithRelationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  latitude: z.lazy(() => SortOrderSchema).optional(),
  longitude: z.lazy(() => SortOrderSchema).optional(),
  user_id: z.lazy(() => SortOrderSchema).optional(),
  bug_image_url: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  bug_type: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  bug_size: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  equipment: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  price: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  note: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  created_at: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  status: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  title: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  user: z.lazy(() => UserOrderByWithRelationInputSchema).optional(),
  matches: z.lazy(() => MatchOrderByRelationAggregateInputSchema).optional()
}).strict();

export const BugReportWhereUniqueInputSchema: z.ZodType<Prisma.BugReportWhereUniqueInput> = z.object({
  id: z.number().int()
})
.and(z.object({
  id: z.number().int().optional(),
  AND: z.union([ z.lazy(() => BugReportWhereInputSchema),z.lazy(() => BugReportWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => BugReportWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => BugReportWhereInputSchema),z.lazy(() => BugReportWhereInputSchema).array() ]).optional(),
  latitude: z.union([ z.lazy(() => FloatFilterSchema),z.number() ]).optional(),
  longitude: z.union([ z.lazy(() => FloatFilterSchema),z.number() ]).optional(),
  user_id: z.union([ z.lazy(() => IntFilterSchema),z.number().int() ]).optional(),
  bug_image_url: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  bug_type: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  bug_size: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  equipment: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  price: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  note: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  created_at: z.union([ z.lazy(() => DateTimeNullableFilterSchema),z.coerce.date() ]).optional().nullable(),
  status: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  title: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  user: z.union([ z.lazy(() => UserRelationFilterSchema),z.lazy(() => UserWhereInputSchema) ]).optional(),
  matches: z.lazy(() => MatchListRelationFilterSchema).optional()
}).strict());

export const BugReportOrderByWithAggregationInputSchema: z.ZodType<Prisma.BugReportOrderByWithAggregationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  latitude: z.lazy(() => SortOrderSchema).optional(),
  longitude: z.lazy(() => SortOrderSchema).optional(),
  user_id: z.lazy(() => SortOrderSchema).optional(),
  bug_image_url: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  bug_type: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  bug_size: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  equipment: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  price: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  note: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  created_at: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  status: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  title: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  _count: z.lazy(() => BugReportCountOrderByAggregateInputSchema).optional(),
  _avg: z.lazy(() => BugReportAvgOrderByAggregateInputSchema).optional(),
  _max: z.lazy(() => BugReportMaxOrderByAggregateInputSchema).optional(),
  _min: z.lazy(() => BugReportMinOrderByAggregateInputSchema).optional(),
  _sum: z.lazy(() => BugReportSumOrderByAggregateInputSchema).optional()
}).strict();

export const BugReportScalarWhereWithAggregatesInputSchema: z.ZodType<Prisma.BugReportScalarWhereWithAggregatesInput> = z.object({
  AND: z.union([ z.lazy(() => BugReportScalarWhereWithAggregatesInputSchema),z.lazy(() => BugReportScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  OR: z.lazy(() => BugReportScalarWhereWithAggregatesInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => BugReportScalarWhereWithAggregatesInputSchema),z.lazy(() => BugReportScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => IntWithAggregatesFilterSchema),z.number() ]).optional(),
  latitude: z.union([ z.lazy(() => FloatWithAggregatesFilterSchema),z.number() ]).optional(),
  longitude: z.union([ z.lazy(() => FloatWithAggregatesFilterSchema),z.number() ]).optional(),
  user_id: z.union([ z.lazy(() => IntWithAggregatesFilterSchema),z.number() ]).optional(),
  bug_image_url: z.union([ z.lazy(() => StringNullableWithAggregatesFilterSchema),z.string() ]).optional().nullable(),
  bug_type: z.union([ z.lazy(() => StringNullableWithAggregatesFilterSchema),z.string() ]).optional().nullable(),
  bug_size: z.union([ z.lazy(() => StringNullableWithAggregatesFilterSchema),z.string() ]).optional().nullable(),
  equipment: z.union([ z.lazy(() => StringNullableWithAggregatesFilterSchema),z.string() ]).optional().nullable(),
  price: z.union([ z.lazy(() => StringNullableWithAggregatesFilterSchema),z.string() ]).optional().nullable(),
  note: z.union([ z.lazy(() => StringNullableWithAggregatesFilterSchema),z.string() ]).optional().nullable(),
  created_at: z.union([ z.lazy(() => DateTimeNullableWithAggregatesFilterSchema),z.coerce.date() ]).optional().nullable(),
  status: z.union([ z.lazy(() => StringNullableWithAggregatesFilterSchema),z.string() ]).optional().nullable(),
  title: z.union([ z.lazy(() => StringNullableWithAggregatesFilterSchema),z.string() ]).optional().nullable(),
}).strict();

export const ChatWhereInputSchema: z.ZodType<Prisma.ChatWhereInput> = z.object({
  AND: z.union([ z.lazy(() => ChatWhereInputSchema),z.lazy(() => ChatWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => ChatWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => ChatWhereInputSchema),z.lazy(() => ChatWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => IntFilterSchema),z.number() ]).optional(),
  match_id: z.union([ z.lazy(() => IntNullableFilterSchema),z.number() ]).optional().nullable(),
  status: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  created_at: z.union([ z.lazy(() => DateTimeNullableFilterSchema),z.coerce.date() ]).optional().nullable(),
  blocked_at: z.union([ z.lazy(() => DateTimeNullableFilterSchema),z.coerce.date() ]).optional().nullable(),
  match: z.union([ z.lazy(() => MatchNullableRelationFilterSchema),z.lazy(() => MatchWhereInputSchema) ]).optional().nullable(),
}).strict();

export const ChatOrderByWithRelationInputSchema: z.ZodType<Prisma.ChatOrderByWithRelationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  match_id: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  status: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  created_at: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  blocked_at: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  match: z.lazy(() => MatchOrderByWithRelationInputSchema).optional()
}).strict();

export const ChatWhereUniqueInputSchema: z.ZodType<Prisma.ChatWhereUniqueInput> = z.object({
  id: z.number().int()
})
.and(z.object({
  id: z.number().int().optional(),
  AND: z.union([ z.lazy(() => ChatWhereInputSchema),z.lazy(() => ChatWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => ChatWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => ChatWhereInputSchema),z.lazy(() => ChatWhereInputSchema).array() ]).optional(),
  match_id: z.union([ z.lazy(() => IntNullableFilterSchema),z.number().int() ]).optional().nullable(),
  status: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  created_at: z.union([ z.lazy(() => DateTimeNullableFilterSchema),z.coerce.date() ]).optional().nullable(),
  blocked_at: z.union([ z.lazy(() => DateTimeNullableFilterSchema),z.coerce.date() ]).optional().nullable(),
  match: z.union([ z.lazy(() => MatchNullableRelationFilterSchema),z.lazy(() => MatchWhereInputSchema) ]).optional().nullable(),
}).strict());

export const ChatOrderByWithAggregationInputSchema: z.ZodType<Prisma.ChatOrderByWithAggregationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  match_id: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  status: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  created_at: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  blocked_at: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  _count: z.lazy(() => ChatCountOrderByAggregateInputSchema).optional(),
  _avg: z.lazy(() => ChatAvgOrderByAggregateInputSchema).optional(),
  _max: z.lazy(() => ChatMaxOrderByAggregateInputSchema).optional(),
  _min: z.lazy(() => ChatMinOrderByAggregateInputSchema).optional(),
  _sum: z.lazy(() => ChatSumOrderByAggregateInputSchema).optional()
}).strict();

export const ChatScalarWhereWithAggregatesInputSchema: z.ZodType<Prisma.ChatScalarWhereWithAggregatesInput> = z.object({
  AND: z.union([ z.lazy(() => ChatScalarWhereWithAggregatesInputSchema),z.lazy(() => ChatScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  OR: z.lazy(() => ChatScalarWhereWithAggregatesInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => ChatScalarWhereWithAggregatesInputSchema),z.lazy(() => ChatScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => IntWithAggregatesFilterSchema),z.number() ]).optional(),
  match_id: z.union([ z.lazy(() => IntNullableWithAggregatesFilterSchema),z.number() ]).optional().nullable(),
  status: z.union([ z.lazy(() => StringNullableWithAggregatesFilterSchema),z.string() ]).optional().nullable(),
  created_at: z.union([ z.lazy(() => DateTimeNullableWithAggregatesFilterSchema),z.coerce.date() ]).optional().nullable(),
  blocked_at: z.union([ z.lazy(() => DateTimeNullableWithAggregatesFilterSchema),z.coerce.date() ]).optional().nullable(),
}).strict();

export const MatchWhereInputSchema: z.ZodType<Prisma.MatchWhereInput> = z.object({
  AND: z.union([ z.lazy(() => MatchWhereInputSchema),z.lazy(() => MatchWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => MatchWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => MatchWhereInputSchema),z.lazy(() => MatchWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => IntFilterSchema),z.number() ]).optional(),
  bug_report_id: z.union([ z.lazy(() => IntNullableFilterSchema),z.number() ]).optional().nullable(),
  helper_id: z.union([ z.lazy(() => IntFilterSchema),z.number() ]).optional(),
  hunter_id: z.union([ z.lazy(() => IntFilterSchema),z.number() ]).optional(),
  status: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  created_at: z.union([ z.lazy(() => DateTimeNullableFilterSchema),z.coerce.date() ]).optional().nullable(),
  accepted_at: z.union([ z.lazy(() => DateTimeNullableFilterSchema),z.coerce.date() ]).optional().nullable(),
  rejected_at: z.union([ z.lazy(() => DateTimeNullableFilterSchema),z.coerce.date() ]).optional().nullable(),
  chats: z.lazy(() => ChatListRelationFilterSchema).optional(),
  bug_report: z.union([ z.lazy(() => BugReportNullableRelationFilterSchema),z.lazy(() => BugReportWhereInputSchema) ]).optional().nullable(),
  hunter: z.union([ z.lazy(() => UserRelationFilterSchema),z.lazy(() => UserWhereInputSchema) ]).optional(),
  helper: z.union([ z.lazy(() => UserRelationFilterSchema),z.lazy(() => UserWhereInputSchema) ]).optional(),
}).strict();

export const MatchOrderByWithRelationInputSchema: z.ZodType<Prisma.MatchOrderByWithRelationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  bug_report_id: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  helper_id: z.lazy(() => SortOrderSchema).optional(),
  hunter_id: z.lazy(() => SortOrderSchema).optional(),
  status: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  created_at: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  accepted_at: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  rejected_at: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  chats: z.lazy(() => ChatOrderByRelationAggregateInputSchema).optional(),
  bug_report: z.lazy(() => BugReportOrderByWithRelationInputSchema).optional(),
  hunter: z.lazy(() => UserOrderByWithRelationInputSchema).optional(),
  helper: z.lazy(() => UserOrderByWithRelationInputSchema).optional()
}).strict();

export const MatchWhereUniqueInputSchema: z.ZodType<Prisma.MatchWhereUniqueInput> = z.object({
  id: z.number().int()
})
.and(z.object({
  id: z.number().int().optional(),
  AND: z.union([ z.lazy(() => MatchWhereInputSchema),z.lazy(() => MatchWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => MatchWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => MatchWhereInputSchema),z.lazy(() => MatchWhereInputSchema).array() ]).optional(),
  bug_report_id: z.union([ z.lazy(() => IntNullableFilterSchema),z.number().int() ]).optional().nullable(),
  helper_id: z.union([ z.lazy(() => IntFilterSchema),z.number().int() ]).optional(),
  hunter_id: z.union([ z.lazy(() => IntFilterSchema),z.number().int() ]).optional(),
  status: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  created_at: z.union([ z.lazy(() => DateTimeNullableFilterSchema),z.coerce.date() ]).optional().nullable(),
  accepted_at: z.union([ z.lazy(() => DateTimeNullableFilterSchema),z.coerce.date() ]).optional().nullable(),
  rejected_at: z.union([ z.lazy(() => DateTimeNullableFilterSchema),z.coerce.date() ]).optional().nullable(),
  chats: z.lazy(() => ChatListRelationFilterSchema).optional(),
  bug_report: z.union([ z.lazy(() => BugReportNullableRelationFilterSchema),z.lazy(() => BugReportWhereInputSchema) ]).optional().nullable(),
  hunter: z.union([ z.lazy(() => UserRelationFilterSchema),z.lazy(() => UserWhereInputSchema) ]).optional(),
  helper: z.union([ z.lazy(() => UserRelationFilterSchema),z.lazy(() => UserWhereInputSchema) ]).optional(),
}).strict());

export const MatchOrderByWithAggregationInputSchema: z.ZodType<Prisma.MatchOrderByWithAggregationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  bug_report_id: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  helper_id: z.lazy(() => SortOrderSchema).optional(),
  hunter_id: z.lazy(() => SortOrderSchema).optional(),
  status: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  created_at: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  accepted_at: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  rejected_at: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  _count: z.lazy(() => MatchCountOrderByAggregateInputSchema).optional(),
  _avg: z.lazy(() => MatchAvgOrderByAggregateInputSchema).optional(),
  _max: z.lazy(() => MatchMaxOrderByAggregateInputSchema).optional(),
  _min: z.lazy(() => MatchMinOrderByAggregateInputSchema).optional(),
  _sum: z.lazy(() => MatchSumOrderByAggregateInputSchema).optional()
}).strict();

export const MatchScalarWhereWithAggregatesInputSchema: z.ZodType<Prisma.MatchScalarWhereWithAggregatesInput> = z.object({
  AND: z.union([ z.lazy(() => MatchScalarWhereWithAggregatesInputSchema),z.lazy(() => MatchScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  OR: z.lazy(() => MatchScalarWhereWithAggregatesInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => MatchScalarWhereWithAggregatesInputSchema),z.lazy(() => MatchScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => IntWithAggregatesFilterSchema),z.number() ]).optional(),
  bug_report_id: z.union([ z.lazy(() => IntNullableWithAggregatesFilterSchema),z.number() ]).optional().nullable(),
  helper_id: z.union([ z.lazy(() => IntWithAggregatesFilterSchema),z.number() ]).optional(),
  hunter_id: z.union([ z.lazy(() => IntWithAggregatesFilterSchema),z.number() ]).optional(),
  status: z.union([ z.lazy(() => StringNullableWithAggregatesFilterSchema),z.string() ]).optional().nullable(),
  created_at: z.union([ z.lazy(() => DateTimeNullableWithAggregatesFilterSchema),z.coerce.date() ]).optional().nullable(),
  accepted_at: z.union([ z.lazy(() => DateTimeNullableWithAggregatesFilterSchema),z.coerce.date() ]).optional().nullable(),
  rejected_at: z.union([ z.lazy(() => DateTimeNullableWithAggregatesFilterSchema),z.coerce.date() ]).optional().nullable(),
}).strict();

export const UserReviewWhereInputSchema: z.ZodType<Prisma.UserReviewWhereInput> = z.object({
  AND: z.union([ z.lazy(() => UserReviewWhereInputSchema),z.lazy(() => UserReviewWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => UserReviewWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => UserReviewWhereInputSchema),z.lazy(() => UserReviewWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => IntFilterSchema),z.number() ]).optional(),
  user_id: z.union([ z.lazy(() => IntFilterSchema),z.number() ]).optional(),
  role: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  score: z.union([ z.lazy(() => IntNullableFilterSchema),z.number() ]).optional().nullable(),
  time_taken: z.union([ z.lazy(() => IntNullableFilterSchema),z.number() ]).optional().nullable(),
  price: z.union([ z.lazy(() => IntNullableFilterSchema),z.number() ]).optional().nullable(),
  review_note: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  created_at: z.union([ z.lazy(() => DateTimeNullableFilterSchema),z.coerce.date() ]).optional().nullable(),
  user: z.union([ z.lazy(() => UserRelationFilterSchema),z.lazy(() => UserWhereInputSchema) ]).optional(),
}).strict();

export const UserReviewOrderByWithRelationInputSchema: z.ZodType<Prisma.UserReviewOrderByWithRelationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  user_id: z.lazy(() => SortOrderSchema).optional(),
  role: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  score: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  time_taken: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  price: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  review_note: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  created_at: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  user: z.lazy(() => UserOrderByWithRelationInputSchema).optional()
}).strict();

export const UserReviewWhereUniqueInputSchema: z.ZodType<Prisma.UserReviewWhereUniqueInput> = z.object({
  id: z.number().int()
})
.and(z.object({
  id: z.number().int().optional(),
  AND: z.union([ z.lazy(() => UserReviewWhereInputSchema),z.lazy(() => UserReviewWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => UserReviewWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => UserReviewWhereInputSchema),z.lazy(() => UserReviewWhereInputSchema).array() ]).optional(),
  user_id: z.union([ z.lazy(() => IntFilterSchema),z.number().int() ]).optional(),
  role: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  score: z.union([ z.lazy(() => IntNullableFilterSchema),z.number().int() ]).optional().nullable(),
  time_taken: z.union([ z.lazy(() => IntNullableFilterSchema),z.number().int() ]).optional().nullable(),
  price: z.union([ z.lazy(() => IntNullableFilterSchema),z.number().int() ]).optional().nullable(),
  review_note: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  created_at: z.union([ z.lazy(() => DateTimeNullableFilterSchema),z.coerce.date() ]).optional().nullable(),
  user: z.union([ z.lazy(() => UserRelationFilterSchema),z.lazy(() => UserWhereInputSchema) ]).optional(),
}).strict());

export const UserReviewOrderByWithAggregationInputSchema: z.ZodType<Prisma.UserReviewOrderByWithAggregationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  user_id: z.lazy(() => SortOrderSchema).optional(),
  role: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  score: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  time_taken: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  price: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  review_note: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  created_at: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  _count: z.lazy(() => UserReviewCountOrderByAggregateInputSchema).optional(),
  _avg: z.lazy(() => UserReviewAvgOrderByAggregateInputSchema).optional(),
  _max: z.lazy(() => UserReviewMaxOrderByAggregateInputSchema).optional(),
  _min: z.lazy(() => UserReviewMinOrderByAggregateInputSchema).optional(),
  _sum: z.lazy(() => UserReviewSumOrderByAggregateInputSchema).optional()
}).strict();

export const UserReviewScalarWhereWithAggregatesInputSchema: z.ZodType<Prisma.UserReviewScalarWhereWithAggregatesInput> = z.object({
  AND: z.union([ z.lazy(() => UserReviewScalarWhereWithAggregatesInputSchema),z.lazy(() => UserReviewScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  OR: z.lazy(() => UserReviewScalarWhereWithAggregatesInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => UserReviewScalarWhereWithAggregatesInputSchema),z.lazy(() => UserReviewScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => IntWithAggregatesFilterSchema),z.number() ]).optional(),
  user_id: z.union([ z.lazy(() => IntWithAggregatesFilterSchema),z.number() ]).optional(),
  role: z.union([ z.lazy(() => StringNullableWithAggregatesFilterSchema),z.string() ]).optional().nullable(),
  score: z.union([ z.lazy(() => IntNullableWithAggregatesFilterSchema),z.number() ]).optional().nullable(),
  time_taken: z.union([ z.lazy(() => IntNullableWithAggregatesFilterSchema),z.number() ]).optional().nullable(),
  price: z.union([ z.lazy(() => IntNullableWithAggregatesFilterSchema),z.number() ]).optional().nullable(),
  review_note: z.union([ z.lazy(() => StringNullableWithAggregatesFilterSchema),z.string() ]).optional().nullable(),
  created_at: z.union([ z.lazy(() => DateTimeNullableWithAggregatesFilterSchema),z.coerce.date() ]).optional().nullable(),
}).strict();

export const UserWhereInputSchema: z.ZodType<Prisma.UserWhereInput> = z.object({
  AND: z.union([ z.lazy(() => UserWhereInputSchema),z.lazy(() => UserWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => UserWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => UserWhereInputSchema),z.lazy(() => UserWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => IntFilterSchema),z.number() ]).optional(),
  kakao_id: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  name: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  phone_number: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  location: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  gender: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  role: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  hunt_count: z.union([ z.lazy(() => IntNullableFilterSchema),z.number() ]).optional().nullable(),
  age_group: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  email: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  password: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  created_at: z.union([ z.lazy(() => DateTimeNullableFilterSchema),z.coerce.date() ]).optional().nullable(),
  updated_at: z.union([ z.lazy(() => DateTimeNullableFilterSchema),z.coerce.date() ]).optional().nullable(),
  terms_accepted: z.union([ z.lazy(() => IntNullableFilterSchema),z.number() ]).optional().nullable(),
  bug_reports: z.lazy(() => BugReportListRelationFilterSchema).optional(),
  hunter_matches: z.lazy(() => MatchListRelationFilterSchema).optional(),
  helper_matches: z.lazy(() => MatchListRelationFilterSchema).optional(),
  user_reviews: z.lazy(() => UserReviewListRelationFilterSchema).optional()
}).strict();

export const UserOrderByWithRelationInputSchema: z.ZodType<Prisma.UserOrderByWithRelationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  kakao_id: z.lazy(() => SortOrderSchema).optional(),
  name: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  phone_number: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  location: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  gender: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  role: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  hunt_count: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  age_group: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  email: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  password: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  created_at: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  updated_at: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  terms_accepted: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  bug_reports: z.lazy(() => BugReportOrderByRelationAggregateInputSchema).optional(),
  hunter_matches: z.lazy(() => MatchOrderByRelationAggregateInputSchema).optional(),
  helper_matches: z.lazy(() => MatchOrderByRelationAggregateInputSchema).optional(),
  user_reviews: z.lazy(() => UserReviewOrderByRelationAggregateInputSchema).optional()
}).strict();

export const UserWhereUniqueInputSchema: z.ZodType<Prisma.UserWhereUniqueInput> = z.object({
  id: z.number().int()
})
.and(z.object({
  id: z.number().int().optional(),
  AND: z.union([ z.lazy(() => UserWhereInputSchema),z.lazy(() => UserWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => UserWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => UserWhereInputSchema),z.lazy(() => UserWhereInputSchema).array() ]).optional(),
  kakao_id: z.union([ z.lazy(() => StringFilterSchema),z.string() ]).optional(),
  name: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  phone_number: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  location: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  gender: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  role: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  hunt_count: z.union([ z.lazy(() => IntNullableFilterSchema),z.number().int() ]).optional().nullable(),
  age_group: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  email: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  password: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  created_at: z.union([ z.lazy(() => DateTimeNullableFilterSchema),z.coerce.date() ]).optional().nullable(),
  updated_at: z.union([ z.lazy(() => DateTimeNullableFilterSchema),z.coerce.date() ]).optional().nullable(),
  terms_accepted: z.union([ z.lazy(() => IntNullableFilterSchema),z.number().int() ]).optional().nullable(),
  bug_reports: z.lazy(() => BugReportListRelationFilterSchema).optional(),
  hunter_matches: z.lazy(() => MatchListRelationFilterSchema).optional(),
  helper_matches: z.lazy(() => MatchListRelationFilterSchema).optional(),
  user_reviews: z.lazy(() => UserReviewListRelationFilterSchema).optional()
}).strict());

export const UserOrderByWithAggregationInputSchema: z.ZodType<Prisma.UserOrderByWithAggregationInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  kakao_id: z.lazy(() => SortOrderSchema).optional(),
  name: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  phone_number: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  location: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  gender: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  role: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  hunt_count: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  age_group: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  email: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  password: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  created_at: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  updated_at: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  terms_accepted: z.union([ z.lazy(() => SortOrderSchema),z.lazy(() => SortOrderInputSchema) ]).optional(),
  _count: z.lazy(() => UserCountOrderByAggregateInputSchema).optional(),
  _avg: z.lazy(() => UserAvgOrderByAggregateInputSchema).optional(),
  _max: z.lazy(() => UserMaxOrderByAggregateInputSchema).optional(),
  _min: z.lazy(() => UserMinOrderByAggregateInputSchema).optional(),
  _sum: z.lazy(() => UserSumOrderByAggregateInputSchema).optional()
}).strict();

export const UserScalarWhereWithAggregatesInputSchema: z.ZodType<Prisma.UserScalarWhereWithAggregatesInput> = z.object({
  AND: z.union([ z.lazy(() => UserScalarWhereWithAggregatesInputSchema),z.lazy(() => UserScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  OR: z.lazy(() => UserScalarWhereWithAggregatesInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => UserScalarWhereWithAggregatesInputSchema),z.lazy(() => UserScalarWhereWithAggregatesInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => IntWithAggregatesFilterSchema),z.number() ]).optional(),
  kakao_id: z.union([ z.lazy(() => StringWithAggregatesFilterSchema),z.string() ]).optional(),
  name: z.union([ z.lazy(() => StringNullableWithAggregatesFilterSchema),z.string() ]).optional().nullable(),
  phone_number: z.union([ z.lazy(() => StringNullableWithAggregatesFilterSchema),z.string() ]).optional().nullable(),
  location: z.union([ z.lazy(() => StringNullableWithAggregatesFilterSchema),z.string() ]).optional().nullable(),
  gender: z.union([ z.lazy(() => StringNullableWithAggregatesFilterSchema),z.string() ]).optional().nullable(),
  role: z.union([ z.lazy(() => StringNullableWithAggregatesFilterSchema),z.string() ]).optional().nullable(),
  hunt_count: z.union([ z.lazy(() => IntNullableWithAggregatesFilterSchema),z.number() ]).optional().nullable(),
  age_group: z.union([ z.lazy(() => StringNullableWithAggregatesFilterSchema),z.string() ]).optional().nullable(),
  email: z.union([ z.lazy(() => StringNullableWithAggregatesFilterSchema),z.string() ]).optional().nullable(),
  password: z.union([ z.lazy(() => StringNullableWithAggregatesFilterSchema),z.string() ]).optional().nullable(),
  created_at: z.union([ z.lazy(() => DateTimeNullableWithAggregatesFilterSchema),z.coerce.date() ]).optional().nullable(),
  updated_at: z.union([ z.lazy(() => DateTimeNullableWithAggregatesFilterSchema),z.coerce.date() ]).optional().nullable(),
  terms_accepted: z.union([ z.lazy(() => IntNullableWithAggregatesFilterSchema),z.number() ]).optional().nullable(),
}).strict();

export const BugReportCreateInputSchema: z.ZodType<Prisma.BugReportCreateInput> = z.object({
  latitude: z.number(),
  longitude: z.number(),
  bug_image_url: z.string().optional().nullable(),
  bug_type: z.string().optional().nullable(),
  bug_size: z.string().optional().nullable(),
  equipment: z.string().optional().nullable(),
  price: z.string().optional().nullable(),
  note: z.string().optional().nullable(),
  created_at: z.coerce.date().optional().nullable(),
  status: z.string().optional().nullable(),
  title: z.string().optional().nullable(),
  user: z.lazy(() => UserCreateNestedOneWithoutBug_reportsInputSchema),
  matches: z.lazy(() => MatchCreateNestedManyWithoutBug_reportInputSchema).optional()
}).strict();

export const BugReportUncheckedCreateInputSchema: z.ZodType<Prisma.BugReportUncheckedCreateInput> = z.object({
  id: z.number().int().optional(),
  latitude: z.number(),
  longitude: z.number(),
  user_id: z.number().int(),
  bug_image_url: z.string().optional().nullable(),
  bug_type: z.string().optional().nullable(),
  bug_size: z.string().optional().nullable(),
  equipment: z.string().optional().nullable(),
  price: z.string().optional().nullable(),
  note: z.string().optional().nullable(),
  created_at: z.coerce.date().optional().nullable(),
  status: z.string().optional().nullable(),
  title: z.string().optional().nullable(),
  matches: z.lazy(() => MatchUncheckedCreateNestedManyWithoutBug_reportInputSchema).optional()
}).strict();

export const BugReportUpdateInputSchema: z.ZodType<Prisma.BugReportUpdateInput> = z.object({
  latitude: z.union([ z.number(),z.lazy(() => FloatFieldUpdateOperationsInputSchema) ]).optional(),
  longitude: z.union([ z.number(),z.lazy(() => FloatFieldUpdateOperationsInputSchema) ]).optional(),
  bug_image_url: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  bug_type: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  bug_size: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  equipment: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  price: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  note: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  created_at: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  status: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  title: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  user: z.lazy(() => UserUpdateOneRequiredWithoutBug_reportsNestedInputSchema).optional(),
  matches: z.lazy(() => MatchUpdateManyWithoutBug_reportNestedInputSchema).optional()
}).strict();

export const BugReportUncheckedUpdateInputSchema: z.ZodType<Prisma.BugReportUncheckedUpdateInput> = z.object({
  id: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  latitude: z.union([ z.number(),z.lazy(() => FloatFieldUpdateOperationsInputSchema) ]).optional(),
  longitude: z.union([ z.number(),z.lazy(() => FloatFieldUpdateOperationsInputSchema) ]).optional(),
  user_id: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  bug_image_url: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  bug_type: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  bug_size: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  equipment: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  price: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  note: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  created_at: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  status: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  title: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  matches: z.lazy(() => MatchUncheckedUpdateManyWithoutBug_reportNestedInputSchema).optional()
}).strict();

export const BugReportCreateManyInputSchema: z.ZodType<Prisma.BugReportCreateManyInput> = z.object({
  id: z.number().int().optional(),
  latitude: z.number(),
  longitude: z.number(),
  user_id: z.number().int(),
  bug_image_url: z.string().optional().nullable(),
  bug_type: z.string().optional().nullable(),
  bug_size: z.string().optional().nullable(),
  equipment: z.string().optional().nullable(),
  price: z.string().optional().nullable(),
  note: z.string().optional().nullable(),
  created_at: z.coerce.date().optional().nullable(),
  status: z.string().optional().nullable(),
  title: z.string().optional().nullable()
}).strict();

export const BugReportUpdateManyMutationInputSchema: z.ZodType<Prisma.BugReportUpdateManyMutationInput> = z.object({
  latitude: z.union([ z.number(),z.lazy(() => FloatFieldUpdateOperationsInputSchema) ]).optional(),
  longitude: z.union([ z.number(),z.lazy(() => FloatFieldUpdateOperationsInputSchema) ]).optional(),
  bug_image_url: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  bug_type: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  bug_size: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  equipment: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  price: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  note: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  created_at: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  status: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  title: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
}).strict();

export const BugReportUncheckedUpdateManyInputSchema: z.ZodType<Prisma.BugReportUncheckedUpdateManyInput> = z.object({
  id: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  latitude: z.union([ z.number(),z.lazy(() => FloatFieldUpdateOperationsInputSchema) ]).optional(),
  longitude: z.union([ z.number(),z.lazy(() => FloatFieldUpdateOperationsInputSchema) ]).optional(),
  user_id: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  bug_image_url: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  bug_type: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  bug_size: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  equipment: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  price: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  note: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  created_at: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  status: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  title: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
}).strict();

export const ChatCreateInputSchema: z.ZodType<Prisma.ChatCreateInput> = z.object({
  status: z.string().optional().nullable(),
  created_at: z.coerce.date().optional().nullable(),
  blocked_at: z.coerce.date().optional().nullable(),
  match: z.lazy(() => MatchCreateNestedOneWithoutChatsInputSchema).optional()
}).strict();

export const ChatUncheckedCreateInputSchema: z.ZodType<Prisma.ChatUncheckedCreateInput> = z.object({
  id: z.number().int().optional(),
  match_id: z.number().int().optional().nullable(),
  status: z.string().optional().nullable(),
  created_at: z.coerce.date().optional().nullable(),
  blocked_at: z.coerce.date().optional().nullable()
}).strict();

export const ChatUpdateInputSchema: z.ZodType<Prisma.ChatUpdateInput> = z.object({
  status: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  created_at: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  blocked_at: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  match: z.lazy(() => MatchUpdateOneWithoutChatsNestedInputSchema).optional()
}).strict();

export const ChatUncheckedUpdateInputSchema: z.ZodType<Prisma.ChatUncheckedUpdateInput> = z.object({
  id: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  match_id: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  status: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  created_at: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  blocked_at: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
}).strict();

export const ChatCreateManyInputSchema: z.ZodType<Prisma.ChatCreateManyInput> = z.object({
  id: z.number().int().optional(),
  match_id: z.number().int().optional().nullable(),
  status: z.string().optional().nullable(),
  created_at: z.coerce.date().optional().nullable(),
  blocked_at: z.coerce.date().optional().nullable()
}).strict();

export const ChatUpdateManyMutationInputSchema: z.ZodType<Prisma.ChatUpdateManyMutationInput> = z.object({
  status: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  created_at: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  blocked_at: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
}).strict();

export const ChatUncheckedUpdateManyInputSchema: z.ZodType<Prisma.ChatUncheckedUpdateManyInput> = z.object({
  id: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  match_id: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  status: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  created_at: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  blocked_at: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
}).strict();

export const MatchCreateInputSchema: z.ZodType<Prisma.MatchCreateInput> = z.object({
  status: z.string().optional().nullable(),
  created_at: z.coerce.date().optional().nullable(),
  accepted_at: z.coerce.date().optional().nullable(),
  rejected_at: z.coerce.date().optional().nullable(),
  chats: z.lazy(() => ChatCreateNestedManyWithoutMatchInputSchema).optional(),
  bug_report: z.lazy(() => BugReportCreateNestedOneWithoutMatchesInputSchema).optional(),
  hunter: z.lazy(() => UserCreateNestedOneWithoutHunter_matchesInputSchema),
  helper: z.lazy(() => UserCreateNestedOneWithoutHelper_matchesInputSchema)
}).strict();

export const MatchUncheckedCreateInputSchema: z.ZodType<Prisma.MatchUncheckedCreateInput> = z.object({
  id: z.number().int().optional(),
  bug_report_id: z.number().int().optional().nullable(),
  helper_id: z.number().int(),
  hunter_id: z.number().int(),
  status: z.string().optional().nullable(),
  created_at: z.coerce.date().optional().nullable(),
  accepted_at: z.coerce.date().optional().nullable(),
  rejected_at: z.coerce.date().optional().nullable(),
  chats: z.lazy(() => ChatUncheckedCreateNestedManyWithoutMatchInputSchema).optional()
}).strict();

export const MatchUpdateInputSchema: z.ZodType<Prisma.MatchUpdateInput> = z.object({
  status: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  created_at: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  accepted_at: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  rejected_at: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  chats: z.lazy(() => ChatUpdateManyWithoutMatchNestedInputSchema).optional(),
  bug_report: z.lazy(() => BugReportUpdateOneWithoutMatchesNestedInputSchema).optional(),
  hunter: z.lazy(() => UserUpdateOneRequiredWithoutHunter_matchesNestedInputSchema).optional(),
  helper: z.lazy(() => UserUpdateOneRequiredWithoutHelper_matchesNestedInputSchema).optional()
}).strict();

export const MatchUncheckedUpdateInputSchema: z.ZodType<Prisma.MatchUncheckedUpdateInput> = z.object({
  id: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  bug_report_id: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  helper_id: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  hunter_id: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  status: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  created_at: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  accepted_at: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  rejected_at: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  chats: z.lazy(() => ChatUncheckedUpdateManyWithoutMatchNestedInputSchema).optional()
}).strict();

export const MatchCreateManyInputSchema: z.ZodType<Prisma.MatchCreateManyInput> = z.object({
  id: z.number().int().optional(),
  bug_report_id: z.number().int().optional().nullable(),
  helper_id: z.number().int(),
  hunter_id: z.number().int(),
  status: z.string().optional().nullable(),
  created_at: z.coerce.date().optional().nullable(),
  accepted_at: z.coerce.date().optional().nullable(),
  rejected_at: z.coerce.date().optional().nullable()
}).strict();

export const MatchUpdateManyMutationInputSchema: z.ZodType<Prisma.MatchUpdateManyMutationInput> = z.object({
  status: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  created_at: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  accepted_at: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  rejected_at: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
}).strict();

export const MatchUncheckedUpdateManyInputSchema: z.ZodType<Prisma.MatchUncheckedUpdateManyInput> = z.object({
  id: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  bug_report_id: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  helper_id: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  hunter_id: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  status: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  created_at: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  accepted_at: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  rejected_at: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
}).strict();

export const UserReviewCreateInputSchema: z.ZodType<Prisma.UserReviewCreateInput> = z.object({
  role: z.string().optional().nullable(),
  score: z.number().int().optional().nullable(),
  time_taken: z.number().int().optional().nullable(),
  price: z.number().int().optional().nullable(),
  review_note: z.string().optional().nullable(),
  created_at: z.coerce.date().optional().nullable(),
  user: z.lazy(() => UserCreateNestedOneWithoutUser_reviewsInputSchema)
}).strict();

export const UserReviewUncheckedCreateInputSchema: z.ZodType<Prisma.UserReviewUncheckedCreateInput> = z.object({
  id: z.number().int().optional(),
  user_id: z.number().int(),
  role: z.string().optional().nullable(),
  score: z.number().int().optional().nullable(),
  time_taken: z.number().int().optional().nullable(),
  price: z.number().int().optional().nullable(),
  review_note: z.string().optional().nullable(),
  created_at: z.coerce.date().optional().nullable()
}).strict();

export const UserReviewUpdateInputSchema: z.ZodType<Prisma.UserReviewUpdateInput> = z.object({
  role: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  score: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  time_taken: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  price: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  review_note: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  created_at: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  user: z.lazy(() => UserUpdateOneRequiredWithoutUser_reviewsNestedInputSchema).optional()
}).strict();

export const UserReviewUncheckedUpdateInputSchema: z.ZodType<Prisma.UserReviewUncheckedUpdateInput> = z.object({
  id: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  user_id: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  role: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  score: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  time_taken: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  price: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  review_note: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  created_at: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
}).strict();

export const UserReviewCreateManyInputSchema: z.ZodType<Prisma.UserReviewCreateManyInput> = z.object({
  id: z.number().int().optional(),
  user_id: z.number().int(),
  role: z.string().optional().nullable(),
  score: z.number().int().optional().nullable(),
  time_taken: z.number().int().optional().nullable(),
  price: z.number().int().optional().nullable(),
  review_note: z.string().optional().nullable(),
  created_at: z.coerce.date().optional().nullable()
}).strict();

export const UserReviewUpdateManyMutationInputSchema: z.ZodType<Prisma.UserReviewUpdateManyMutationInput> = z.object({
  role: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  score: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  time_taken: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  price: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  review_note: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  created_at: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
}).strict();

export const UserReviewUncheckedUpdateManyInputSchema: z.ZodType<Prisma.UserReviewUncheckedUpdateManyInput> = z.object({
  id: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  user_id: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  role: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  score: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  time_taken: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  price: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  review_note: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  created_at: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
}).strict();

export const UserCreateInputSchema: z.ZodType<Prisma.UserCreateInput> = z.object({
  kakao_id: z.string(),
  name: z.string().optional().nullable(),
  phone_number: z.string().optional().nullable(),
  location: z.string().optional().nullable(),
  gender: z.string().optional().nullable(),
  role: z.string().optional().nullable(),
  hunt_count: z.number().int().optional().nullable(),
  age_group: z.string().optional().nullable(),
  email: z.string().optional().nullable(),
  password: z.string().optional().nullable(),
  created_at: z.coerce.date().optional().nullable(),
  updated_at: z.coerce.date().optional().nullable(),
  terms_accepted: z.number().int().optional().nullable(),
  bug_reports: z.lazy(() => BugReportCreateNestedManyWithoutUserInputSchema).optional(),
  hunter_matches: z.lazy(() => MatchCreateNestedManyWithoutHunterInputSchema).optional(),
  helper_matches: z.lazy(() => MatchCreateNestedManyWithoutHelperInputSchema).optional(),
  user_reviews: z.lazy(() => UserReviewCreateNestedManyWithoutUserInputSchema).optional()
}).strict();

export const UserUncheckedCreateInputSchema: z.ZodType<Prisma.UserUncheckedCreateInput> = z.object({
  id: z.number().int().optional(),
  kakao_id: z.string(),
  name: z.string().optional().nullable(),
  phone_number: z.string().optional().nullable(),
  location: z.string().optional().nullable(),
  gender: z.string().optional().nullable(),
  role: z.string().optional().nullable(),
  hunt_count: z.number().int().optional().nullable(),
  age_group: z.string().optional().nullable(),
  email: z.string().optional().nullable(),
  password: z.string().optional().nullable(),
  created_at: z.coerce.date().optional().nullable(),
  updated_at: z.coerce.date().optional().nullable(),
  terms_accepted: z.number().int().optional().nullable(),
  bug_reports: z.lazy(() => BugReportUncheckedCreateNestedManyWithoutUserInputSchema).optional(),
  hunter_matches: z.lazy(() => MatchUncheckedCreateNestedManyWithoutHunterInputSchema).optional(),
  helper_matches: z.lazy(() => MatchUncheckedCreateNestedManyWithoutHelperInputSchema).optional(),
  user_reviews: z.lazy(() => UserReviewUncheckedCreateNestedManyWithoutUserInputSchema).optional()
}).strict();

export const UserUpdateInputSchema: z.ZodType<Prisma.UserUpdateInput> = z.object({
  kakao_id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  phone_number: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  location: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  gender: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  role: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  hunt_count: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  age_group: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  email: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  password: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  created_at: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  updated_at: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  terms_accepted: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  bug_reports: z.lazy(() => BugReportUpdateManyWithoutUserNestedInputSchema).optional(),
  hunter_matches: z.lazy(() => MatchUpdateManyWithoutHunterNestedInputSchema).optional(),
  helper_matches: z.lazy(() => MatchUpdateManyWithoutHelperNestedInputSchema).optional(),
  user_reviews: z.lazy(() => UserReviewUpdateManyWithoutUserNestedInputSchema).optional()
}).strict();

export const UserUncheckedUpdateInputSchema: z.ZodType<Prisma.UserUncheckedUpdateInput> = z.object({
  id: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  kakao_id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  phone_number: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  location: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  gender: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  role: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  hunt_count: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  age_group: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  email: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  password: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  created_at: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  updated_at: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  terms_accepted: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  bug_reports: z.lazy(() => BugReportUncheckedUpdateManyWithoutUserNestedInputSchema).optional(),
  hunter_matches: z.lazy(() => MatchUncheckedUpdateManyWithoutHunterNestedInputSchema).optional(),
  helper_matches: z.lazy(() => MatchUncheckedUpdateManyWithoutHelperNestedInputSchema).optional(),
  user_reviews: z.lazy(() => UserReviewUncheckedUpdateManyWithoutUserNestedInputSchema).optional()
}).strict();

export const UserCreateManyInputSchema: z.ZodType<Prisma.UserCreateManyInput> = z.object({
  id: z.number().int().optional(),
  kakao_id: z.string(),
  name: z.string().optional().nullable(),
  phone_number: z.string().optional().nullable(),
  location: z.string().optional().nullable(),
  gender: z.string().optional().nullable(),
  role: z.string().optional().nullable(),
  hunt_count: z.number().int().optional().nullable(),
  age_group: z.string().optional().nullable(),
  email: z.string().optional().nullable(),
  password: z.string().optional().nullable(),
  created_at: z.coerce.date().optional().nullable(),
  updated_at: z.coerce.date().optional().nullable(),
  terms_accepted: z.number().int().optional().nullable()
}).strict();

export const UserUpdateManyMutationInputSchema: z.ZodType<Prisma.UserUpdateManyMutationInput> = z.object({
  kakao_id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  phone_number: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  location: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  gender: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  role: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  hunt_count: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  age_group: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  email: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  password: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  created_at: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  updated_at: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  terms_accepted: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
}).strict();

export const UserUncheckedUpdateManyInputSchema: z.ZodType<Prisma.UserUncheckedUpdateManyInput> = z.object({
  id: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  kakao_id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  phone_number: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  location: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  gender: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  role: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  hunt_count: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  age_group: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  email: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  password: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  created_at: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  updated_at: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  terms_accepted: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
}).strict();

export const IntFilterSchema: z.ZodType<Prisma.IntFilter> = z.object({
  equals: z.number().optional(),
  in: z.number().array().optional(),
  notIn: z.number().array().optional(),
  lt: z.number().optional(),
  lte: z.number().optional(),
  gt: z.number().optional(),
  gte: z.number().optional(),
  not: z.union([ z.number(),z.lazy(() => NestedIntFilterSchema) ]).optional(),
}).strict();

export const FloatFilterSchema: z.ZodType<Prisma.FloatFilter> = z.object({
  equals: z.number().optional(),
  in: z.number().array().optional(),
  notIn: z.number().array().optional(),
  lt: z.number().optional(),
  lte: z.number().optional(),
  gt: z.number().optional(),
  gte: z.number().optional(),
  not: z.union([ z.number(),z.lazy(() => NestedFloatFilterSchema) ]).optional(),
}).strict();

export const StringNullableFilterSchema: z.ZodType<Prisma.StringNullableFilter> = z.object({
  equals: z.string().optional().nullable(),
  in: z.string().array().optional().nullable(),
  notIn: z.string().array().optional().nullable(),
  lt: z.string().optional(),
  lte: z.string().optional(),
  gt: z.string().optional(),
  gte: z.string().optional(),
  contains: z.string().optional(),
  startsWith: z.string().optional(),
  endsWith: z.string().optional(),
  not: z.union([ z.string(),z.lazy(() => NestedStringNullableFilterSchema) ]).optional().nullable(),
}).strict();

export const DateTimeNullableFilterSchema: z.ZodType<Prisma.DateTimeNullableFilter> = z.object({
  equals: z.coerce.date().optional().nullable(),
  in: z.coerce.date().array().optional().nullable(),
  notIn: z.coerce.date().array().optional().nullable(),
  lt: z.coerce.date().optional(),
  lte: z.coerce.date().optional(),
  gt: z.coerce.date().optional(),
  gte: z.coerce.date().optional(),
  not: z.union([ z.coerce.date(),z.lazy(() => NestedDateTimeNullableFilterSchema) ]).optional().nullable(),
}).strict();

export const UserRelationFilterSchema: z.ZodType<Prisma.UserRelationFilter> = z.object({
  is: z.lazy(() => UserWhereInputSchema).optional(),
  isNot: z.lazy(() => UserWhereInputSchema).optional()
}).strict();

export const MatchListRelationFilterSchema: z.ZodType<Prisma.MatchListRelationFilter> = z.object({
  every: z.lazy(() => MatchWhereInputSchema).optional(),
  some: z.lazy(() => MatchWhereInputSchema).optional(),
  none: z.lazy(() => MatchWhereInputSchema).optional()
}).strict();

export const SortOrderInputSchema: z.ZodType<Prisma.SortOrderInput> = z.object({
  sort: z.lazy(() => SortOrderSchema),
  nulls: z.lazy(() => NullsOrderSchema).optional()
}).strict();

export const MatchOrderByRelationAggregateInputSchema: z.ZodType<Prisma.MatchOrderByRelationAggregateInput> = z.object({
  _count: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const BugReportCountOrderByAggregateInputSchema: z.ZodType<Prisma.BugReportCountOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  latitude: z.lazy(() => SortOrderSchema).optional(),
  longitude: z.lazy(() => SortOrderSchema).optional(),
  user_id: z.lazy(() => SortOrderSchema).optional(),
  bug_image_url: z.lazy(() => SortOrderSchema).optional(),
  bug_type: z.lazy(() => SortOrderSchema).optional(),
  bug_size: z.lazy(() => SortOrderSchema).optional(),
  equipment: z.lazy(() => SortOrderSchema).optional(),
  price: z.lazy(() => SortOrderSchema).optional(),
  note: z.lazy(() => SortOrderSchema).optional(),
  created_at: z.lazy(() => SortOrderSchema).optional(),
  status: z.lazy(() => SortOrderSchema).optional(),
  title: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const BugReportAvgOrderByAggregateInputSchema: z.ZodType<Prisma.BugReportAvgOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  latitude: z.lazy(() => SortOrderSchema).optional(),
  longitude: z.lazy(() => SortOrderSchema).optional(),
  user_id: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const BugReportMaxOrderByAggregateInputSchema: z.ZodType<Prisma.BugReportMaxOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  latitude: z.lazy(() => SortOrderSchema).optional(),
  longitude: z.lazy(() => SortOrderSchema).optional(),
  user_id: z.lazy(() => SortOrderSchema).optional(),
  bug_image_url: z.lazy(() => SortOrderSchema).optional(),
  bug_type: z.lazy(() => SortOrderSchema).optional(),
  bug_size: z.lazy(() => SortOrderSchema).optional(),
  equipment: z.lazy(() => SortOrderSchema).optional(),
  price: z.lazy(() => SortOrderSchema).optional(),
  note: z.lazy(() => SortOrderSchema).optional(),
  created_at: z.lazy(() => SortOrderSchema).optional(),
  status: z.lazy(() => SortOrderSchema).optional(),
  title: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const BugReportMinOrderByAggregateInputSchema: z.ZodType<Prisma.BugReportMinOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  latitude: z.lazy(() => SortOrderSchema).optional(),
  longitude: z.lazy(() => SortOrderSchema).optional(),
  user_id: z.lazy(() => SortOrderSchema).optional(),
  bug_image_url: z.lazy(() => SortOrderSchema).optional(),
  bug_type: z.lazy(() => SortOrderSchema).optional(),
  bug_size: z.lazy(() => SortOrderSchema).optional(),
  equipment: z.lazy(() => SortOrderSchema).optional(),
  price: z.lazy(() => SortOrderSchema).optional(),
  note: z.lazy(() => SortOrderSchema).optional(),
  created_at: z.lazy(() => SortOrderSchema).optional(),
  status: z.lazy(() => SortOrderSchema).optional(),
  title: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const BugReportSumOrderByAggregateInputSchema: z.ZodType<Prisma.BugReportSumOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  latitude: z.lazy(() => SortOrderSchema).optional(),
  longitude: z.lazy(() => SortOrderSchema).optional(),
  user_id: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const IntWithAggregatesFilterSchema: z.ZodType<Prisma.IntWithAggregatesFilter> = z.object({
  equals: z.number().optional(),
  in: z.number().array().optional(),
  notIn: z.number().array().optional(),
  lt: z.number().optional(),
  lte: z.number().optional(),
  gt: z.number().optional(),
  gte: z.number().optional(),
  not: z.union([ z.number(),z.lazy(() => NestedIntWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _avg: z.lazy(() => NestedFloatFilterSchema).optional(),
  _sum: z.lazy(() => NestedIntFilterSchema).optional(),
  _min: z.lazy(() => NestedIntFilterSchema).optional(),
  _max: z.lazy(() => NestedIntFilterSchema).optional()
}).strict();

export const FloatWithAggregatesFilterSchema: z.ZodType<Prisma.FloatWithAggregatesFilter> = z.object({
  equals: z.number().optional(),
  in: z.number().array().optional(),
  notIn: z.number().array().optional(),
  lt: z.number().optional(),
  lte: z.number().optional(),
  gt: z.number().optional(),
  gte: z.number().optional(),
  not: z.union([ z.number(),z.lazy(() => NestedFloatWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _avg: z.lazy(() => NestedFloatFilterSchema).optional(),
  _sum: z.lazy(() => NestedFloatFilterSchema).optional(),
  _min: z.lazy(() => NestedFloatFilterSchema).optional(),
  _max: z.lazy(() => NestedFloatFilterSchema).optional()
}).strict();

export const StringNullableWithAggregatesFilterSchema: z.ZodType<Prisma.StringNullableWithAggregatesFilter> = z.object({
  equals: z.string().optional().nullable(),
  in: z.string().array().optional().nullable(),
  notIn: z.string().array().optional().nullable(),
  lt: z.string().optional(),
  lte: z.string().optional(),
  gt: z.string().optional(),
  gte: z.string().optional(),
  contains: z.string().optional(),
  startsWith: z.string().optional(),
  endsWith: z.string().optional(),
  not: z.union([ z.string(),z.lazy(() => NestedStringNullableWithAggregatesFilterSchema) ]).optional().nullable(),
  _count: z.lazy(() => NestedIntNullableFilterSchema).optional(),
  _min: z.lazy(() => NestedStringNullableFilterSchema).optional(),
  _max: z.lazy(() => NestedStringNullableFilterSchema).optional()
}).strict();

export const DateTimeNullableWithAggregatesFilterSchema: z.ZodType<Prisma.DateTimeNullableWithAggregatesFilter> = z.object({
  equals: z.coerce.date().optional().nullable(),
  in: z.coerce.date().array().optional().nullable(),
  notIn: z.coerce.date().array().optional().nullable(),
  lt: z.coerce.date().optional(),
  lte: z.coerce.date().optional(),
  gt: z.coerce.date().optional(),
  gte: z.coerce.date().optional(),
  not: z.union([ z.coerce.date(),z.lazy(() => NestedDateTimeNullableWithAggregatesFilterSchema) ]).optional().nullable(),
  _count: z.lazy(() => NestedIntNullableFilterSchema).optional(),
  _min: z.lazy(() => NestedDateTimeNullableFilterSchema).optional(),
  _max: z.lazy(() => NestedDateTimeNullableFilterSchema).optional()
}).strict();

export const IntNullableFilterSchema: z.ZodType<Prisma.IntNullableFilter> = z.object({
  equals: z.number().optional().nullable(),
  in: z.number().array().optional().nullable(),
  notIn: z.number().array().optional().nullable(),
  lt: z.number().optional(),
  lte: z.number().optional(),
  gt: z.number().optional(),
  gte: z.number().optional(),
  not: z.union([ z.number(),z.lazy(() => NestedIntNullableFilterSchema) ]).optional().nullable(),
}).strict();

export const MatchNullableRelationFilterSchema: z.ZodType<Prisma.MatchNullableRelationFilter> = z.object({
  is: z.lazy(() => MatchWhereInputSchema).optional().nullable(),
  isNot: z.lazy(() => MatchWhereInputSchema).optional().nullable()
}).strict();

export const ChatCountOrderByAggregateInputSchema: z.ZodType<Prisma.ChatCountOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  match_id: z.lazy(() => SortOrderSchema).optional(),
  status: z.lazy(() => SortOrderSchema).optional(),
  created_at: z.lazy(() => SortOrderSchema).optional(),
  blocked_at: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const ChatAvgOrderByAggregateInputSchema: z.ZodType<Prisma.ChatAvgOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  match_id: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const ChatMaxOrderByAggregateInputSchema: z.ZodType<Prisma.ChatMaxOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  match_id: z.lazy(() => SortOrderSchema).optional(),
  status: z.lazy(() => SortOrderSchema).optional(),
  created_at: z.lazy(() => SortOrderSchema).optional(),
  blocked_at: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const ChatMinOrderByAggregateInputSchema: z.ZodType<Prisma.ChatMinOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  match_id: z.lazy(() => SortOrderSchema).optional(),
  status: z.lazy(() => SortOrderSchema).optional(),
  created_at: z.lazy(() => SortOrderSchema).optional(),
  blocked_at: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const ChatSumOrderByAggregateInputSchema: z.ZodType<Prisma.ChatSumOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  match_id: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const IntNullableWithAggregatesFilterSchema: z.ZodType<Prisma.IntNullableWithAggregatesFilter> = z.object({
  equals: z.number().optional().nullable(),
  in: z.number().array().optional().nullable(),
  notIn: z.number().array().optional().nullable(),
  lt: z.number().optional(),
  lte: z.number().optional(),
  gt: z.number().optional(),
  gte: z.number().optional(),
  not: z.union([ z.number(),z.lazy(() => NestedIntNullableWithAggregatesFilterSchema) ]).optional().nullable(),
  _count: z.lazy(() => NestedIntNullableFilterSchema).optional(),
  _avg: z.lazy(() => NestedFloatNullableFilterSchema).optional(),
  _sum: z.lazy(() => NestedIntNullableFilterSchema).optional(),
  _min: z.lazy(() => NestedIntNullableFilterSchema).optional(),
  _max: z.lazy(() => NestedIntNullableFilterSchema).optional()
}).strict();

export const ChatListRelationFilterSchema: z.ZodType<Prisma.ChatListRelationFilter> = z.object({
  every: z.lazy(() => ChatWhereInputSchema).optional(),
  some: z.lazy(() => ChatWhereInputSchema).optional(),
  none: z.lazy(() => ChatWhereInputSchema).optional()
}).strict();

export const BugReportNullableRelationFilterSchema: z.ZodType<Prisma.BugReportNullableRelationFilter> = z.object({
  is: z.lazy(() => BugReportWhereInputSchema).optional().nullable(),
  isNot: z.lazy(() => BugReportWhereInputSchema).optional().nullable()
}).strict();

export const ChatOrderByRelationAggregateInputSchema: z.ZodType<Prisma.ChatOrderByRelationAggregateInput> = z.object({
  _count: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const MatchCountOrderByAggregateInputSchema: z.ZodType<Prisma.MatchCountOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  bug_report_id: z.lazy(() => SortOrderSchema).optional(),
  helper_id: z.lazy(() => SortOrderSchema).optional(),
  hunter_id: z.lazy(() => SortOrderSchema).optional(),
  status: z.lazy(() => SortOrderSchema).optional(),
  created_at: z.lazy(() => SortOrderSchema).optional(),
  accepted_at: z.lazy(() => SortOrderSchema).optional(),
  rejected_at: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const MatchAvgOrderByAggregateInputSchema: z.ZodType<Prisma.MatchAvgOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  bug_report_id: z.lazy(() => SortOrderSchema).optional(),
  helper_id: z.lazy(() => SortOrderSchema).optional(),
  hunter_id: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const MatchMaxOrderByAggregateInputSchema: z.ZodType<Prisma.MatchMaxOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  bug_report_id: z.lazy(() => SortOrderSchema).optional(),
  helper_id: z.lazy(() => SortOrderSchema).optional(),
  hunter_id: z.lazy(() => SortOrderSchema).optional(),
  status: z.lazy(() => SortOrderSchema).optional(),
  created_at: z.lazy(() => SortOrderSchema).optional(),
  accepted_at: z.lazy(() => SortOrderSchema).optional(),
  rejected_at: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const MatchMinOrderByAggregateInputSchema: z.ZodType<Prisma.MatchMinOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  bug_report_id: z.lazy(() => SortOrderSchema).optional(),
  helper_id: z.lazy(() => SortOrderSchema).optional(),
  hunter_id: z.lazy(() => SortOrderSchema).optional(),
  status: z.lazy(() => SortOrderSchema).optional(),
  created_at: z.lazy(() => SortOrderSchema).optional(),
  accepted_at: z.lazy(() => SortOrderSchema).optional(),
  rejected_at: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const MatchSumOrderByAggregateInputSchema: z.ZodType<Prisma.MatchSumOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  bug_report_id: z.lazy(() => SortOrderSchema).optional(),
  helper_id: z.lazy(() => SortOrderSchema).optional(),
  hunter_id: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const UserReviewCountOrderByAggregateInputSchema: z.ZodType<Prisma.UserReviewCountOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  user_id: z.lazy(() => SortOrderSchema).optional(),
  role: z.lazy(() => SortOrderSchema).optional(),
  score: z.lazy(() => SortOrderSchema).optional(),
  time_taken: z.lazy(() => SortOrderSchema).optional(),
  price: z.lazy(() => SortOrderSchema).optional(),
  review_note: z.lazy(() => SortOrderSchema).optional(),
  created_at: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const UserReviewAvgOrderByAggregateInputSchema: z.ZodType<Prisma.UserReviewAvgOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  user_id: z.lazy(() => SortOrderSchema).optional(),
  score: z.lazy(() => SortOrderSchema).optional(),
  time_taken: z.lazy(() => SortOrderSchema).optional(),
  price: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const UserReviewMaxOrderByAggregateInputSchema: z.ZodType<Prisma.UserReviewMaxOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  user_id: z.lazy(() => SortOrderSchema).optional(),
  role: z.lazy(() => SortOrderSchema).optional(),
  score: z.lazy(() => SortOrderSchema).optional(),
  time_taken: z.lazy(() => SortOrderSchema).optional(),
  price: z.lazy(() => SortOrderSchema).optional(),
  review_note: z.lazy(() => SortOrderSchema).optional(),
  created_at: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const UserReviewMinOrderByAggregateInputSchema: z.ZodType<Prisma.UserReviewMinOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  user_id: z.lazy(() => SortOrderSchema).optional(),
  role: z.lazy(() => SortOrderSchema).optional(),
  score: z.lazy(() => SortOrderSchema).optional(),
  time_taken: z.lazy(() => SortOrderSchema).optional(),
  price: z.lazy(() => SortOrderSchema).optional(),
  review_note: z.lazy(() => SortOrderSchema).optional(),
  created_at: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const UserReviewSumOrderByAggregateInputSchema: z.ZodType<Prisma.UserReviewSumOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  user_id: z.lazy(() => SortOrderSchema).optional(),
  score: z.lazy(() => SortOrderSchema).optional(),
  time_taken: z.lazy(() => SortOrderSchema).optional(),
  price: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const StringFilterSchema: z.ZodType<Prisma.StringFilter> = z.object({
  equals: z.string().optional(),
  in: z.string().array().optional(),
  notIn: z.string().array().optional(),
  lt: z.string().optional(),
  lte: z.string().optional(),
  gt: z.string().optional(),
  gte: z.string().optional(),
  contains: z.string().optional(),
  startsWith: z.string().optional(),
  endsWith: z.string().optional(),
  not: z.union([ z.string(),z.lazy(() => NestedStringFilterSchema) ]).optional(),
}).strict();

export const BugReportListRelationFilterSchema: z.ZodType<Prisma.BugReportListRelationFilter> = z.object({
  every: z.lazy(() => BugReportWhereInputSchema).optional(),
  some: z.lazy(() => BugReportWhereInputSchema).optional(),
  none: z.lazy(() => BugReportWhereInputSchema).optional()
}).strict();

export const UserReviewListRelationFilterSchema: z.ZodType<Prisma.UserReviewListRelationFilter> = z.object({
  every: z.lazy(() => UserReviewWhereInputSchema).optional(),
  some: z.lazy(() => UserReviewWhereInputSchema).optional(),
  none: z.lazy(() => UserReviewWhereInputSchema).optional()
}).strict();

export const BugReportOrderByRelationAggregateInputSchema: z.ZodType<Prisma.BugReportOrderByRelationAggregateInput> = z.object({
  _count: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const UserReviewOrderByRelationAggregateInputSchema: z.ZodType<Prisma.UserReviewOrderByRelationAggregateInput> = z.object({
  _count: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const UserCountOrderByAggregateInputSchema: z.ZodType<Prisma.UserCountOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  kakao_id: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  phone_number: z.lazy(() => SortOrderSchema).optional(),
  location: z.lazy(() => SortOrderSchema).optional(),
  gender: z.lazy(() => SortOrderSchema).optional(),
  role: z.lazy(() => SortOrderSchema).optional(),
  hunt_count: z.lazy(() => SortOrderSchema).optional(),
  age_group: z.lazy(() => SortOrderSchema).optional(),
  email: z.lazy(() => SortOrderSchema).optional(),
  password: z.lazy(() => SortOrderSchema).optional(),
  created_at: z.lazy(() => SortOrderSchema).optional(),
  updated_at: z.lazy(() => SortOrderSchema).optional(),
  terms_accepted: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const UserAvgOrderByAggregateInputSchema: z.ZodType<Prisma.UserAvgOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  hunt_count: z.lazy(() => SortOrderSchema).optional(),
  terms_accepted: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const UserMaxOrderByAggregateInputSchema: z.ZodType<Prisma.UserMaxOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  kakao_id: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  phone_number: z.lazy(() => SortOrderSchema).optional(),
  location: z.lazy(() => SortOrderSchema).optional(),
  gender: z.lazy(() => SortOrderSchema).optional(),
  role: z.lazy(() => SortOrderSchema).optional(),
  hunt_count: z.lazy(() => SortOrderSchema).optional(),
  age_group: z.lazy(() => SortOrderSchema).optional(),
  email: z.lazy(() => SortOrderSchema).optional(),
  password: z.lazy(() => SortOrderSchema).optional(),
  created_at: z.lazy(() => SortOrderSchema).optional(),
  updated_at: z.lazy(() => SortOrderSchema).optional(),
  terms_accepted: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const UserMinOrderByAggregateInputSchema: z.ZodType<Prisma.UserMinOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  kakao_id: z.lazy(() => SortOrderSchema).optional(),
  name: z.lazy(() => SortOrderSchema).optional(),
  phone_number: z.lazy(() => SortOrderSchema).optional(),
  location: z.lazy(() => SortOrderSchema).optional(),
  gender: z.lazy(() => SortOrderSchema).optional(),
  role: z.lazy(() => SortOrderSchema).optional(),
  hunt_count: z.lazy(() => SortOrderSchema).optional(),
  age_group: z.lazy(() => SortOrderSchema).optional(),
  email: z.lazy(() => SortOrderSchema).optional(),
  password: z.lazy(() => SortOrderSchema).optional(),
  created_at: z.lazy(() => SortOrderSchema).optional(),
  updated_at: z.lazy(() => SortOrderSchema).optional(),
  terms_accepted: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const UserSumOrderByAggregateInputSchema: z.ZodType<Prisma.UserSumOrderByAggregateInput> = z.object({
  id: z.lazy(() => SortOrderSchema).optional(),
  hunt_count: z.lazy(() => SortOrderSchema).optional(),
  terms_accepted: z.lazy(() => SortOrderSchema).optional()
}).strict();

export const StringWithAggregatesFilterSchema: z.ZodType<Prisma.StringWithAggregatesFilter> = z.object({
  equals: z.string().optional(),
  in: z.string().array().optional(),
  notIn: z.string().array().optional(),
  lt: z.string().optional(),
  lte: z.string().optional(),
  gt: z.string().optional(),
  gte: z.string().optional(),
  contains: z.string().optional(),
  startsWith: z.string().optional(),
  endsWith: z.string().optional(),
  not: z.union([ z.string(),z.lazy(() => NestedStringWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _min: z.lazy(() => NestedStringFilterSchema).optional(),
  _max: z.lazy(() => NestedStringFilterSchema).optional()
}).strict();

export const UserCreateNestedOneWithoutBug_reportsInputSchema: z.ZodType<Prisma.UserCreateNestedOneWithoutBug_reportsInput> = z.object({
  create: z.union([ z.lazy(() => UserCreateWithoutBug_reportsInputSchema),z.lazy(() => UserUncheckedCreateWithoutBug_reportsInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => UserCreateOrConnectWithoutBug_reportsInputSchema).optional(),
  connect: z.lazy(() => UserWhereUniqueInputSchema).optional()
}).strict();

export const MatchCreateNestedManyWithoutBug_reportInputSchema: z.ZodType<Prisma.MatchCreateNestedManyWithoutBug_reportInput> = z.object({
  create: z.union([ z.lazy(() => MatchCreateWithoutBug_reportInputSchema),z.lazy(() => MatchCreateWithoutBug_reportInputSchema).array(),z.lazy(() => MatchUncheckedCreateWithoutBug_reportInputSchema),z.lazy(() => MatchUncheckedCreateWithoutBug_reportInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => MatchCreateOrConnectWithoutBug_reportInputSchema),z.lazy(() => MatchCreateOrConnectWithoutBug_reportInputSchema).array() ]).optional(),
  createMany: z.lazy(() => MatchCreateManyBug_reportInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => MatchWhereUniqueInputSchema),z.lazy(() => MatchWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const MatchUncheckedCreateNestedManyWithoutBug_reportInputSchema: z.ZodType<Prisma.MatchUncheckedCreateNestedManyWithoutBug_reportInput> = z.object({
  create: z.union([ z.lazy(() => MatchCreateWithoutBug_reportInputSchema),z.lazy(() => MatchCreateWithoutBug_reportInputSchema).array(),z.lazy(() => MatchUncheckedCreateWithoutBug_reportInputSchema),z.lazy(() => MatchUncheckedCreateWithoutBug_reportInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => MatchCreateOrConnectWithoutBug_reportInputSchema),z.lazy(() => MatchCreateOrConnectWithoutBug_reportInputSchema).array() ]).optional(),
  createMany: z.lazy(() => MatchCreateManyBug_reportInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => MatchWhereUniqueInputSchema),z.lazy(() => MatchWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const FloatFieldUpdateOperationsInputSchema: z.ZodType<Prisma.FloatFieldUpdateOperationsInput> = z.object({
  set: z.number().optional(),
  increment: z.number().optional(),
  decrement: z.number().optional(),
  multiply: z.number().optional(),
  divide: z.number().optional()
}).strict();

export const NullableStringFieldUpdateOperationsInputSchema: z.ZodType<Prisma.NullableStringFieldUpdateOperationsInput> = z.object({
  set: z.string().optional().nullable()
}).strict();

export const NullableDateTimeFieldUpdateOperationsInputSchema: z.ZodType<Prisma.NullableDateTimeFieldUpdateOperationsInput> = z.object({
  set: z.coerce.date().optional().nullable()
}).strict();

export const UserUpdateOneRequiredWithoutBug_reportsNestedInputSchema: z.ZodType<Prisma.UserUpdateOneRequiredWithoutBug_reportsNestedInput> = z.object({
  create: z.union([ z.lazy(() => UserCreateWithoutBug_reportsInputSchema),z.lazy(() => UserUncheckedCreateWithoutBug_reportsInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => UserCreateOrConnectWithoutBug_reportsInputSchema).optional(),
  upsert: z.lazy(() => UserUpsertWithoutBug_reportsInputSchema).optional(),
  connect: z.lazy(() => UserWhereUniqueInputSchema).optional(),
  update: z.union([ z.lazy(() => UserUpdateToOneWithWhereWithoutBug_reportsInputSchema),z.lazy(() => UserUpdateWithoutBug_reportsInputSchema),z.lazy(() => UserUncheckedUpdateWithoutBug_reportsInputSchema) ]).optional(),
}).strict();

export const MatchUpdateManyWithoutBug_reportNestedInputSchema: z.ZodType<Prisma.MatchUpdateManyWithoutBug_reportNestedInput> = z.object({
  create: z.union([ z.lazy(() => MatchCreateWithoutBug_reportInputSchema),z.lazy(() => MatchCreateWithoutBug_reportInputSchema).array(),z.lazy(() => MatchUncheckedCreateWithoutBug_reportInputSchema),z.lazy(() => MatchUncheckedCreateWithoutBug_reportInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => MatchCreateOrConnectWithoutBug_reportInputSchema),z.lazy(() => MatchCreateOrConnectWithoutBug_reportInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => MatchUpsertWithWhereUniqueWithoutBug_reportInputSchema),z.lazy(() => MatchUpsertWithWhereUniqueWithoutBug_reportInputSchema).array() ]).optional(),
  createMany: z.lazy(() => MatchCreateManyBug_reportInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => MatchWhereUniqueInputSchema),z.lazy(() => MatchWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => MatchWhereUniqueInputSchema),z.lazy(() => MatchWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => MatchWhereUniqueInputSchema),z.lazy(() => MatchWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => MatchWhereUniqueInputSchema),z.lazy(() => MatchWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => MatchUpdateWithWhereUniqueWithoutBug_reportInputSchema),z.lazy(() => MatchUpdateWithWhereUniqueWithoutBug_reportInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => MatchUpdateManyWithWhereWithoutBug_reportInputSchema),z.lazy(() => MatchUpdateManyWithWhereWithoutBug_reportInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => MatchScalarWhereInputSchema),z.lazy(() => MatchScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const IntFieldUpdateOperationsInputSchema: z.ZodType<Prisma.IntFieldUpdateOperationsInput> = z.object({
  set: z.number().optional(),
  increment: z.number().optional(),
  decrement: z.number().optional(),
  multiply: z.number().optional(),
  divide: z.number().optional()
}).strict();

export const MatchUncheckedUpdateManyWithoutBug_reportNestedInputSchema: z.ZodType<Prisma.MatchUncheckedUpdateManyWithoutBug_reportNestedInput> = z.object({
  create: z.union([ z.lazy(() => MatchCreateWithoutBug_reportInputSchema),z.lazy(() => MatchCreateWithoutBug_reportInputSchema).array(),z.lazy(() => MatchUncheckedCreateWithoutBug_reportInputSchema),z.lazy(() => MatchUncheckedCreateWithoutBug_reportInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => MatchCreateOrConnectWithoutBug_reportInputSchema),z.lazy(() => MatchCreateOrConnectWithoutBug_reportInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => MatchUpsertWithWhereUniqueWithoutBug_reportInputSchema),z.lazy(() => MatchUpsertWithWhereUniqueWithoutBug_reportInputSchema).array() ]).optional(),
  createMany: z.lazy(() => MatchCreateManyBug_reportInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => MatchWhereUniqueInputSchema),z.lazy(() => MatchWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => MatchWhereUniqueInputSchema),z.lazy(() => MatchWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => MatchWhereUniqueInputSchema),z.lazy(() => MatchWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => MatchWhereUniqueInputSchema),z.lazy(() => MatchWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => MatchUpdateWithWhereUniqueWithoutBug_reportInputSchema),z.lazy(() => MatchUpdateWithWhereUniqueWithoutBug_reportInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => MatchUpdateManyWithWhereWithoutBug_reportInputSchema),z.lazy(() => MatchUpdateManyWithWhereWithoutBug_reportInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => MatchScalarWhereInputSchema),z.lazy(() => MatchScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const MatchCreateNestedOneWithoutChatsInputSchema: z.ZodType<Prisma.MatchCreateNestedOneWithoutChatsInput> = z.object({
  create: z.union([ z.lazy(() => MatchCreateWithoutChatsInputSchema),z.lazy(() => MatchUncheckedCreateWithoutChatsInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => MatchCreateOrConnectWithoutChatsInputSchema).optional(),
  connect: z.lazy(() => MatchWhereUniqueInputSchema).optional()
}).strict();

export const MatchUpdateOneWithoutChatsNestedInputSchema: z.ZodType<Prisma.MatchUpdateOneWithoutChatsNestedInput> = z.object({
  create: z.union([ z.lazy(() => MatchCreateWithoutChatsInputSchema),z.lazy(() => MatchUncheckedCreateWithoutChatsInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => MatchCreateOrConnectWithoutChatsInputSchema).optional(),
  upsert: z.lazy(() => MatchUpsertWithoutChatsInputSchema).optional(),
  disconnect: z.union([ z.boolean(),z.lazy(() => MatchWhereInputSchema) ]).optional(),
  delete: z.union([ z.boolean(),z.lazy(() => MatchWhereInputSchema) ]).optional(),
  connect: z.lazy(() => MatchWhereUniqueInputSchema).optional(),
  update: z.union([ z.lazy(() => MatchUpdateToOneWithWhereWithoutChatsInputSchema),z.lazy(() => MatchUpdateWithoutChatsInputSchema),z.lazy(() => MatchUncheckedUpdateWithoutChatsInputSchema) ]).optional(),
}).strict();

export const NullableIntFieldUpdateOperationsInputSchema: z.ZodType<Prisma.NullableIntFieldUpdateOperationsInput> = z.object({
  set: z.number().optional().nullable(),
  increment: z.number().optional(),
  decrement: z.number().optional(),
  multiply: z.number().optional(),
  divide: z.number().optional()
}).strict();

export const ChatCreateNestedManyWithoutMatchInputSchema: z.ZodType<Prisma.ChatCreateNestedManyWithoutMatchInput> = z.object({
  create: z.union([ z.lazy(() => ChatCreateWithoutMatchInputSchema),z.lazy(() => ChatCreateWithoutMatchInputSchema).array(),z.lazy(() => ChatUncheckedCreateWithoutMatchInputSchema),z.lazy(() => ChatUncheckedCreateWithoutMatchInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => ChatCreateOrConnectWithoutMatchInputSchema),z.lazy(() => ChatCreateOrConnectWithoutMatchInputSchema).array() ]).optional(),
  createMany: z.lazy(() => ChatCreateManyMatchInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => ChatWhereUniqueInputSchema),z.lazy(() => ChatWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const BugReportCreateNestedOneWithoutMatchesInputSchema: z.ZodType<Prisma.BugReportCreateNestedOneWithoutMatchesInput> = z.object({
  create: z.union([ z.lazy(() => BugReportCreateWithoutMatchesInputSchema),z.lazy(() => BugReportUncheckedCreateWithoutMatchesInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => BugReportCreateOrConnectWithoutMatchesInputSchema).optional(),
  connect: z.lazy(() => BugReportWhereUniqueInputSchema).optional()
}).strict();

export const UserCreateNestedOneWithoutHunter_matchesInputSchema: z.ZodType<Prisma.UserCreateNestedOneWithoutHunter_matchesInput> = z.object({
  create: z.union([ z.lazy(() => UserCreateWithoutHunter_matchesInputSchema),z.lazy(() => UserUncheckedCreateWithoutHunter_matchesInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => UserCreateOrConnectWithoutHunter_matchesInputSchema).optional(),
  connect: z.lazy(() => UserWhereUniqueInputSchema).optional()
}).strict();

export const UserCreateNestedOneWithoutHelper_matchesInputSchema: z.ZodType<Prisma.UserCreateNestedOneWithoutHelper_matchesInput> = z.object({
  create: z.union([ z.lazy(() => UserCreateWithoutHelper_matchesInputSchema),z.lazy(() => UserUncheckedCreateWithoutHelper_matchesInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => UserCreateOrConnectWithoutHelper_matchesInputSchema).optional(),
  connect: z.lazy(() => UserWhereUniqueInputSchema).optional()
}).strict();

export const ChatUncheckedCreateNestedManyWithoutMatchInputSchema: z.ZodType<Prisma.ChatUncheckedCreateNestedManyWithoutMatchInput> = z.object({
  create: z.union([ z.lazy(() => ChatCreateWithoutMatchInputSchema),z.lazy(() => ChatCreateWithoutMatchInputSchema).array(),z.lazy(() => ChatUncheckedCreateWithoutMatchInputSchema),z.lazy(() => ChatUncheckedCreateWithoutMatchInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => ChatCreateOrConnectWithoutMatchInputSchema),z.lazy(() => ChatCreateOrConnectWithoutMatchInputSchema).array() ]).optional(),
  createMany: z.lazy(() => ChatCreateManyMatchInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => ChatWhereUniqueInputSchema),z.lazy(() => ChatWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const ChatUpdateManyWithoutMatchNestedInputSchema: z.ZodType<Prisma.ChatUpdateManyWithoutMatchNestedInput> = z.object({
  create: z.union([ z.lazy(() => ChatCreateWithoutMatchInputSchema),z.lazy(() => ChatCreateWithoutMatchInputSchema).array(),z.lazy(() => ChatUncheckedCreateWithoutMatchInputSchema),z.lazy(() => ChatUncheckedCreateWithoutMatchInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => ChatCreateOrConnectWithoutMatchInputSchema),z.lazy(() => ChatCreateOrConnectWithoutMatchInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => ChatUpsertWithWhereUniqueWithoutMatchInputSchema),z.lazy(() => ChatUpsertWithWhereUniqueWithoutMatchInputSchema).array() ]).optional(),
  createMany: z.lazy(() => ChatCreateManyMatchInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => ChatWhereUniqueInputSchema),z.lazy(() => ChatWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => ChatWhereUniqueInputSchema),z.lazy(() => ChatWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => ChatWhereUniqueInputSchema),z.lazy(() => ChatWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => ChatWhereUniqueInputSchema),z.lazy(() => ChatWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => ChatUpdateWithWhereUniqueWithoutMatchInputSchema),z.lazy(() => ChatUpdateWithWhereUniqueWithoutMatchInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => ChatUpdateManyWithWhereWithoutMatchInputSchema),z.lazy(() => ChatUpdateManyWithWhereWithoutMatchInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => ChatScalarWhereInputSchema),z.lazy(() => ChatScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const BugReportUpdateOneWithoutMatchesNestedInputSchema: z.ZodType<Prisma.BugReportUpdateOneWithoutMatchesNestedInput> = z.object({
  create: z.union([ z.lazy(() => BugReportCreateWithoutMatchesInputSchema),z.lazy(() => BugReportUncheckedCreateWithoutMatchesInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => BugReportCreateOrConnectWithoutMatchesInputSchema).optional(),
  upsert: z.lazy(() => BugReportUpsertWithoutMatchesInputSchema).optional(),
  disconnect: z.union([ z.boolean(),z.lazy(() => BugReportWhereInputSchema) ]).optional(),
  delete: z.union([ z.boolean(),z.lazy(() => BugReportWhereInputSchema) ]).optional(),
  connect: z.lazy(() => BugReportWhereUniqueInputSchema).optional(),
  update: z.union([ z.lazy(() => BugReportUpdateToOneWithWhereWithoutMatchesInputSchema),z.lazy(() => BugReportUpdateWithoutMatchesInputSchema),z.lazy(() => BugReportUncheckedUpdateWithoutMatchesInputSchema) ]).optional(),
}).strict();

export const UserUpdateOneRequiredWithoutHunter_matchesNestedInputSchema: z.ZodType<Prisma.UserUpdateOneRequiredWithoutHunter_matchesNestedInput> = z.object({
  create: z.union([ z.lazy(() => UserCreateWithoutHunter_matchesInputSchema),z.lazy(() => UserUncheckedCreateWithoutHunter_matchesInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => UserCreateOrConnectWithoutHunter_matchesInputSchema).optional(),
  upsert: z.lazy(() => UserUpsertWithoutHunter_matchesInputSchema).optional(),
  connect: z.lazy(() => UserWhereUniqueInputSchema).optional(),
  update: z.union([ z.lazy(() => UserUpdateToOneWithWhereWithoutHunter_matchesInputSchema),z.lazy(() => UserUpdateWithoutHunter_matchesInputSchema),z.lazy(() => UserUncheckedUpdateWithoutHunter_matchesInputSchema) ]).optional(),
}).strict();

export const UserUpdateOneRequiredWithoutHelper_matchesNestedInputSchema: z.ZodType<Prisma.UserUpdateOneRequiredWithoutHelper_matchesNestedInput> = z.object({
  create: z.union([ z.lazy(() => UserCreateWithoutHelper_matchesInputSchema),z.lazy(() => UserUncheckedCreateWithoutHelper_matchesInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => UserCreateOrConnectWithoutHelper_matchesInputSchema).optional(),
  upsert: z.lazy(() => UserUpsertWithoutHelper_matchesInputSchema).optional(),
  connect: z.lazy(() => UserWhereUniqueInputSchema).optional(),
  update: z.union([ z.lazy(() => UserUpdateToOneWithWhereWithoutHelper_matchesInputSchema),z.lazy(() => UserUpdateWithoutHelper_matchesInputSchema),z.lazy(() => UserUncheckedUpdateWithoutHelper_matchesInputSchema) ]).optional(),
}).strict();

export const ChatUncheckedUpdateManyWithoutMatchNestedInputSchema: z.ZodType<Prisma.ChatUncheckedUpdateManyWithoutMatchNestedInput> = z.object({
  create: z.union([ z.lazy(() => ChatCreateWithoutMatchInputSchema),z.lazy(() => ChatCreateWithoutMatchInputSchema).array(),z.lazy(() => ChatUncheckedCreateWithoutMatchInputSchema),z.lazy(() => ChatUncheckedCreateWithoutMatchInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => ChatCreateOrConnectWithoutMatchInputSchema),z.lazy(() => ChatCreateOrConnectWithoutMatchInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => ChatUpsertWithWhereUniqueWithoutMatchInputSchema),z.lazy(() => ChatUpsertWithWhereUniqueWithoutMatchInputSchema).array() ]).optional(),
  createMany: z.lazy(() => ChatCreateManyMatchInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => ChatWhereUniqueInputSchema),z.lazy(() => ChatWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => ChatWhereUniqueInputSchema),z.lazy(() => ChatWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => ChatWhereUniqueInputSchema),z.lazy(() => ChatWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => ChatWhereUniqueInputSchema),z.lazy(() => ChatWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => ChatUpdateWithWhereUniqueWithoutMatchInputSchema),z.lazy(() => ChatUpdateWithWhereUniqueWithoutMatchInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => ChatUpdateManyWithWhereWithoutMatchInputSchema),z.lazy(() => ChatUpdateManyWithWhereWithoutMatchInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => ChatScalarWhereInputSchema),z.lazy(() => ChatScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const UserCreateNestedOneWithoutUser_reviewsInputSchema: z.ZodType<Prisma.UserCreateNestedOneWithoutUser_reviewsInput> = z.object({
  create: z.union([ z.lazy(() => UserCreateWithoutUser_reviewsInputSchema),z.lazy(() => UserUncheckedCreateWithoutUser_reviewsInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => UserCreateOrConnectWithoutUser_reviewsInputSchema).optional(),
  connect: z.lazy(() => UserWhereUniqueInputSchema).optional()
}).strict();

export const UserUpdateOneRequiredWithoutUser_reviewsNestedInputSchema: z.ZodType<Prisma.UserUpdateOneRequiredWithoutUser_reviewsNestedInput> = z.object({
  create: z.union([ z.lazy(() => UserCreateWithoutUser_reviewsInputSchema),z.lazy(() => UserUncheckedCreateWithoutUser_reviewsInputSchema) ]).optional(),
  connectOrCreate: z.lazy(() => UserCreateOrConnectWithoutUser_reviewsInputSchema).optional(),
  upsert: z.lazy(() => UserUpsertWithoutUser_reviewsInputSchema).optional(),
  connect: z.lazy(() => UserWhereUniqueInputSchema).optional(),
  update: z.union([ z.lazy(() => UserUpdateToOneWithWhereWithoutUser_reviewsInputSchema),z.lazy(() => UserUpdateWithoutUser_reviewsInputSchema),z.lazy(() => UserUncheckedUpdateWithoutUser_reviewsInputSchema) ]).optional(),
}).strict();

export const BugReportCreateNestedManyWithoutUserInputSchema: z.ZodType<Prisma.BugReportCreateNestedManyWithoutUserInput> = z.object({
  create: z.union([ z.lazy(() => BugReportCreateWithoutUserInputSchema),z.lazy(() => BugReportCreateWithoutUserInputSchema).array(),z.lazy(() => BugReportUncheckedCreateWithoutUserInputSchema),z.lazy(() => BugReportUncheckedCreateWithoutUserInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => BugReportCreateOrConnectWithoutUserInputSchema),z.lazy(() => BugReportCreateOrConnectWithoutUserInputSchema).array() ]).optional(),
  createMany: z.lazy(() => BugReportCreateManyUserInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => BugReportWhereUniqueInputSchema),z.lazy(() => BugReportWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const MatchCreateNestedManyWithoutHunterInputSchema: z.ZodType<Prisma.MatchCreateNestedManyWithoutHunterInput> = z.object({
  create: z.union([ z.lazy(() => MatchCreateWithoutHunterInputSchema),z.lazy(() => MatchCreateWithoutHunterInputSchema).array(),z.lazy(() => MatchUncheckedCreateWithoutHunterInputSchema),z.lazy(() => MatchUncheckedCreateWithoutHunterInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => MatchCreateOrConnectWithoutHunterInputSchema),z.lazy(() => MatchCreateOrConnectWithoutHunterInputSchema).array() ]).optional(),
  createMany: z.lazy(() => MatchCreateManyHunterInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => MatchWhereUniqueInputSchema),z.lazy(() => MatchWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const MatchCreateNestedManyWithoutHelperInputSchema: z.ZodType<Prisma.MatchCreateNestedManyWithoutHelperInput> = z.object({
  create: z.union([ z.lazy(() => MatchCreateWithoutHelperInputSchema),z.lazy(() => MatchCreateWithoutHelperInputSchema).array(),z.lazy(() => MatchUncheckedCreateWithoutHelperInputSchema),z.lazy(() => MatchUncheckedCreateWithoutHelperInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => MatchCreateOrConnectWithoutHelperInputSchema),z.lazy(() => MatchCreateOrConnectWithoutHelperInputSchema).array() ]).optional(),
  createMany: z.lazy(() => MatchCreateManyHelperInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => MatchWhereUniqueInputSchema),z.lazy(() => MatchWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const UserReviewCreateNestedManyWithoutUserInputSchema: z.ZodType<Prisma.UserReviewCreateNestedManyWithoutUserInput> = z.object({
  create: z.union([ z.lazy(() => UserReviewCreateWithoutUserInputSchema),z.lazy(() => UserReviewCreateWithoutUserInputSchema).array(),z.lazy(() => UserReviewUncheckedCreateWithoutUserInputSchema),z.lazy(() => UserReviewUncheckedCreateWithoutUserInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => UserReviewCreateOrConnectWithoutUserInputSchema),z.lazy(() => UserReviewCreateOrConnectWithoutUserInputSchema).array() ]).optional(),
  createMany: z.lazy(() => UserReviewCreateManyUserInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => UserReviewWhereUniqueInputSchema),z.lazy(() => UserReviewWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const BugReportUncheckedCreateNestedManyWithoutUserInputSchema: z.ZodType<Prisma.BugReportUncheckedCreateNestedManyWithoutUserInput> = z.object({
  create: z.union([ z.lazy(() => BugReportCreateWithoutUserInputSchema),z.lazy(() => BugReportCreateWithoutUserInputSchema).array(),z.lazy(() => BugReportUncheckedCreateWithoutUserInputSchema),z.lazy(() => BugReportUncheckedCreateWithoutUserInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => BugReportCreateOrConnectWithoutUserInputSchema),z.lazy(() => BugReportCreateOrConnectWithoutUserInputSchema).array() ]).optional(),
  createMany: z.lazy(() => BugReportCreateManyUserInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => BugReportWhereUniqueInputSchema),z.lazy(() => BugReportWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const MatchUncheckedCreateNestedManyWithoutHunterInputSchema: z.ZodType<Prisma.MatchUncheckedCreateNestedManyWithoutHunterInput> = z.object({
  create: z.union([ z.lazy(() => MatchCreateWithoutHunterInputSchema),z.lazy(() => MatchCreateWithoutHunterInputSchema).array(),z.lazy(() => MatchUncheckedCreateWithoutHunterInputSchema),z.lazy(() => MatchUncheckedCreateWithoutHunterInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => MatchCreateOrConnectWithoutHunterInputSchema),z.lazy(() => MatchCreateOrConnectWithoutHunterInputSchema).array() ]).optional(),
  createMany: z.lazy(() => MatchCreateManyHunterInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => MatchWhereUniqueInputSchema),z.lazy(() => MatchWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const MatchUncheckedCreateNestedManyWithoutHelperInputSchema: z.ZodType<Prisma.MatchUncheckedCreateNestedManyWithoutHelperInput> = z.object({
  create: z.union([ z.lazy(() => MatchCreateWithoutHelperInputSchema),z.lazy(() => MatchCreateWithoutHelperInputSchema).array(),z.lazy(() => MatchUncheckedCreateWithoutHelperInputSchema),z.lazy(() => MatchUncheckedCreateWithoutHelperInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => MatchCreateOrConnectWithoutHelperInputSchema),z.lazy(() => MatchCreateOrConnectWithoutHelperInputSchema).array() ]).optional(),
  createMany: z.lazy(() => MatchCreateManyHelperInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => MatchWhereUniqueInputSchema),z.lazy(() => MatchWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const UserReviewUncheckedCreateNestedManyWithoutUserInputSchema: z.ZodType<Prisma.UserReviewUncheckedCreateNestedManyWithoutUserInput> = z.object({
  create: z.union([ z.lazy(() => UserReviewCreateWithoutUserInputSchema),z.lazy(() => UserReviewCreateWithoutUserInputSchema).array(),z.lazy(() => UserReviewUncheckedCreateWithoutUserInputSchema),z.lazy(() => UserReviewUncheckedCreateWithoutUserInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => UserReviewCreateOrConnectWithoutUserInputSchema),z.lazy(() => UserReviewCreateOrConnectWithoutUserInputSchema).array() ]).optional(),
  createMany: z.lazy(() => UserReviewCreateManyUserInputEnvelopeSchema).optional(),
  connect: z.union([ z.lazy(() => UserReviewWhereUniqueInputSchema),z.lazy(() => UserReviewWhereUniqueInputSchema).array() ]).optional(),
}).strict();

export const StringFieldUpdateOperationsInputSchema: z.ZodType<Prisma.StringFieldUpdateOperationsInput> = z.object({
  set: z.string().optional()
}).strict();

export const BugReportUpdateManyWithoutUserNestedInputSchema: z.ZodType<Prisma.BugReportUpdateManyWithoutUserNestedInput> = z.object({
  create: z.union([ z.lazy(() => BugReportCreateWithoutUserInputSchema),z.lazy(() => BugReportCreateWithoutUserInputSchema).array(),z.lazy(() => BugReportUncheckedCreateWithoutUserInputSchema),z.lazy(() => BugReportUncheckedCreateWithoutUserInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => BugReportCreateOrConnectWithoutUserInputSchema),z.lazy(() => BugReportCreateOrConnectWithoutUserInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => BugReportUpsertWithWhereUniqueWithoutUserInputSchema),z.lazy(() => BugReportUpsertWithWhereUniqueWithoutUserInputSchema).array() ]).optional(),
  createMany: z.lazy(() => BugReportCreateManyUserInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => BugReportWhereUniqueInputSchema),z.lazy(() => BugReportWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => BugReportWhereUniqueInputSchema),z.lazy(() => BugReportWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => BugReportWhereUniqueInputSchema),z.lazy(() => BugReportWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => BugReportWhereUniqueInputSchema),z.lazy(() => BugReportWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => BugReportUpdateWithWhereUniqueWithoutUserInputSchema),z.lazy(() => BugReportUpdateWithWhereUniqueWithoutUserInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => BugReportUpdateManyWithWhereWithoutUserInputSchema),z.lazy(() => BugReportUpdateManyWithWhereWithoutUserInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => BugReportScalarWhereInputSchema),z.lazy(() => BugReportScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const MatchUpdateManyWithoutHunterNestedInputSchema: z.ZodType<Prisma.MatchUpdateManyWithoutHunterNestedInput> = z.object({
  create: z.union([ z.lazy(() => MatchCreateWithoutHunterInputSchema),z.lazy(() => MatchCreateWithoutHunterInputSchema).array(),z.lazy(() => MatchUncheckedCreateWithoutHunterInputSchema),z.lazy(() => MatchUncheckedCreateWithoutHunterInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => MatchCreateOrConnectWithoutHunterInputSchema),z.lazy(() => MatchCreateOrConnectWithoutHunterInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => MatchUpsertWithWhereUniqueWithoutHunterInputSchema),z.lazy(() => MatchUpsertWithWhereUniqueWithoutHunterInputSchema).array() ]).optional(),
  createMany: z.lazy(() => MatchCreateManyHunterInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => MatchWhereUniqueInputSchema),z.lazy(() => MatchWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => MatchWhereUniqueInputSchema),z.lazy(() => MatchWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => MatchWhereUniqueInputSchema),z.lazy(() => MatchWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => MatchWhereUniqueInputSchema),z.lazy(() => MatchWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => MatchUpdateWithWhereUniqueWithoutHunterInputSchema),z.lazy(() => MatchUpdateWithWhereUniqueWithoutHunterInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => MatchUpdateManyWithWhereWithoutHunterInputSchema),z.lazy(() => MatchUpdateManyWithWhereWithoutHunterInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => MatchScalarWhereInputSchema),z.lazy(() => MatchScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const MatchUpdateManyWithoutHelperNestedInputSchema: z.ZodType<Prisma.MatchUpdateManyWithoutHelperNestedInput> = z.object({
  create: z.union([ z.lazy(() => MatchCreateWithoutHelperInputSchema),z.lazy(() => MatchCreateWithoutHelperInputSchema).array(),z.lazy(() => MatchUncheckedCreateWithoutHelperInputSchema),z.lazy(() => MatchUncheckedCreateWithoutHelperInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => MatchCreateOrConnectWithoutHelperInputSchema),z.lazy(() => MatchCreateOrConnectWithoutHelperInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => MatchUpsertWithWhereUniqueWithoutHelperInputSchema),z.lazy(() => MatchUpsertWithWhereUniqueWithoutHelperInputSchema).array() ]).optional(),
  createMany: z.lazy(() => MatchCreateManyHelperInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => MatchWhereUniqueInputSchema),z.lazy(() => MatchWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => MatchWhereUniqueInputSchema),z.lazy(() => MatchWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => MatchWhereUniqueInputSchema),z.lazy(() => MatchWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => MatchWhereUniqueInputSchema),z.lazy(() => MatchWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => MatchUpdateWithWhereUniqueWithoutHelperInputSchema),z.lazy(() => MatchUpdateWithWhereUniqueWithoutHelperInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => MatchUpdateManyWithWhereWithoutHelperInputSchema),z.lazy(() => MatchUpdateManyWithWhereWithoutHelperInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => MatchScalarWhereInputSchema),z.lazy(() => MatchScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const UserReviewUpdateManyWithoutUserNestedInputSchema: z.ZodType<Prisma.UserReviewUpdateManyWithoutUserNestedInput> = z.object({
  create: z.union([ z.lazy(() => UserReviewCreateWithoutUserInputSchema),z.lazy(() => UserReviewCreateWithoutUserInputSchema).array(),z.lazy(() => UserReviewUncheckedCreateWithoutUserInputSchema),z.lazy(() => UserReviewUncheckedCreateWithoutUserInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => UserReviewCreateOrConnectWithoutUserInputSchema),z.lazy(() => UserReviewCreateOrConnectWithoutUserInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => UserReviewUpsertWithWhereUniqueWithoutUserInputSchema),z.lazy(() => UserReviewUpsertWithWhereUniqueWithoutUserInputSchema).array() ]).optional(),
  createMany: z.lazy(() => UserReviewCreateManyUserInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => UserReviewWhereUniqueInputSchema),z.lazy(() => UserReviewWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => UserReviewWhereUniqueInputSchema),z.lazy(() => UserReviewWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => UserReviewWhereUniqueInputSchema),z.lazy(() => UserReviewWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => UserReviewWhereUniqueInputSchema),z.lazy(() => UserReviewWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => UserReviewUpdateWithWhereUniqueWithoutUserInputSchema),z.lazy(() => UserReviewUpdateWithWhereUniqueWithoutUserInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => UserReviewUpdateManyWithWhereWithoutUserInputSchema),z.lazy(() => UserReviewUpdateManyWithWhereWithoutUserInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => UserReviewScalarWhereInputSchema),z.lazy(() => UserReviewScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const BugReportUncheckedUpdateManyWithoutUserNestedInputSchema: z.ZodType<Prisma.BugReportUncheckedUpdateManyWithoutUserNestedInput> = z.object({
  create: z.union([ z.lazy(() => BugReportCreateWithoutUserInputSchema),z.lazy(() => BugReportCreateWithoutUserInputSchema).array(),z.lazy(() => BugReportUncheckedCreateWithoutUserInputSchema),z.lazy(() => BugReportUncheckedCreateWithoutUserInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => BugReportCreateOrConnectWithoutUserInputSchema),z.lazy(() => BugReportCreateOrConnectWithoutUserInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => BugReportUpsertWithWhereUniqueWithoutUserInputSchema),z.lazy(() => BugReportUpsertWithWhereUniqueWithoutUserInputSchema).array() ]).optional(),
  createMany: z.lazy(() => BugReportCreateManyUserInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => BugReportWhereUniqueInputSchema),z.lazy(() => BugReportWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => BugReportWhereUniqueInputSchema),z.lazy(() => BugReportWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => BugReportWhereUniqueInputSchema),z.lazy(() => BugReportWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => BugReportWhereUniqueInputSchema),z.lazy(() => BugReportWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => BugReportUpdateWithWhereUniqueWithoutUserInputSchema),z.lazy(() => BugReportUpdateWithWhereUniqueWithoutUserInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => BugReportUpdateManyWithWhereWithoutUserInputSchema),z.lazy(() => BugReportUpdateManyWithWhereWithoutUserInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => BugReportScalarWhereInputSchema),z.lazy(() => BugReportScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const MatchUncheckedUpdateManyWithoutHunterNestedInputSchema: z.ZodType<Prisma.MatchUncheckedUpdateManyWithoutHunterNestedInput> = z.object({
  create: z.union([ z.lazy(() => MatchCreateWithoutHunterInputSchema),z.lazy(() => MatchCreateWithoutHunterInputSchema).array(),z.lazy(() => MatchUncheckedCreateWithoutHunterInputSchema),z.lazy(() => MatchUncheckedCreateWithoutHunterInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => MatchCreateOrConnectWithoutHunterInputSchema),z.lazy(() => MatchCreateOrConnectWithoutHunterInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => MatchUpsertWithWhereUniqueWithoutHunterInputSchema),z.lazy(() => MatchUpsertWithWhereUniqueWithoutHunterInputSchema).array() ]).optional(),
  createMany: z.lazy(() => MatchCreateManyHunterInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => MatchWhereUniqueInputSchema),z.lazy(() => MatchWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => MatchWhereUniqueInputSchema),z.lazy(() => MatchWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => MatchWhereUniqueInputSchema),z.lazy(() => MatchWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => MatchWhereUniqueInputSchema),z.lazy(() => MatchWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => MatchUpdateWithWhereUniqueWithoutHunterInputSchema),z.lazy(() => MatchUpdateWithWhereUniqueWithoutHunterInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => MatchUpdateManyWithWhereWithoutHunterInputSchema),z.lazy(() => MatchUpdateManyWithWhereWithoutHunterInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => MatchScalarWhereInputSchema),z.lazy(() => MatchScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const MatchUncheckedUpdateManyWithoutHelperNestedInputSchema: z.ZodType<Prisma.MatchUncheckedUpdateManyWithoutHelperNestedInput> = z.object({
  create: z.union([ z.lazy(() => MatchCreateWithoutHelperInputSchema),z.lazy(() => MatchCreateWithoutHelperInputSchema).array(),z.lazy(() => MatchUncheckedCreateWithoutHelperInputSchema),z.lazy(() => MatchUncheckedCreateWithoutHelperInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => MatchCreateOrConnectWithoutHelperInputSchema),z.lazy(() => MatchCreateOrConnectWithoutHelperInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => MatchUpsertWithWhereUniqueWithoutHelperInputSchema),z.lazy(() => MatchUpsertWithWhereUniqueWithoutHelperInputSchema).array() ]).optional(),
  createMany: z.lazy(() => MatchCreateManyHelperInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => MatchWhereUniqueInputSchema),z.lazy(() => MatchWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => MatchWhereUniqueInputSchema),z.lazy(() => MatchWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => MatchWhereUniqueInputSchema),z.lazy(() => MatchWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => MatchWhereUniqueInputSchema),z.lazy(() => MatchWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => MatchUpdateWithWhereUniqueWithoutHelperInputSchema),z.lazy(() => MatchUpdateWithWhereUniqueWithoutHelperInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => MatchUpdateManyWithWhereWithoutHelperInputSchema),z.lazy(() => MatchUpdateManyWithWhereWithoutHelperInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => MatchScalarWhereInputSchema),z.lazy(() => MatchScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const UserReviewUncheckedUpdateManyWithoutUserNestedInputSchema: z.ZodType<Prisma.UserReviewUncheckedUpdateManyWithoutUserNestedInput> = z.object({
  create: z.union([ z.lazy(() => UserReviewCreateWithoutUserInputSchema),z.lazy(() => UserReviewCreateWithoutUserInputSchema).array(),z.lazy(() => UserReviewUncheckedCreateWithoutUserInputSchema),z.lazy(() => UserReviewUncheckedCreateWithoutUserInputSchema).array() ]).optional(),
  connectOrCreate: z.union([ z.lazy(() => UserReviewCreateOrConnectWithoutUserInputSchema),z.lazy(() => UserReviewCreateOrConnectWithoutUserInputSchema).array() ]).optional(),
  upsert: z.union([ z.lazy(() => UserReviewUpsertWithWhereUniqueWithoutUserInputSchema),z.lazy(() => UserReviewUpsertWithWhereUniqueWithoutUserInputSchema).array() ]).optional(),
  createMany: z.lazy(() => UserReviewCreateManyUserInputEnvelopeSchema).optional(),
  set: z.union([ z.lazy(() => UserReviewWhereUniqueInputSchema),z.lazy(() => UserReviewWhereUniqueInputSchema).array() ]).optional(),
  disconnect: z.union([ z.lazy(() => UserReviewWhereUniqueInputSchema),z.lazy(() => UserReviewWhereUniqueInputSchema).array() ]).optional(),
  delete: z.union([ z.lazy(() => UserReviewWhereUniqueInputSchema),z.lazy(() => UserReviewWhereUniqueInputSchema).array() ]).optional(),
  connect: z.union([ z.lazy(() => UserReviewWhereUniqueInputSchema),z.lazy(() => UserReviewWhereUniqueInputSchema).array() ]).optional(),
  update: z.union([ z.lazy(() => UserReviewUpdateWithWhereUniqueWithoutUserInputSchema),z.lazy(() => UserReviewUpdateWithWhereUniqueWithoutUserInputSchema).array() ]).optional(),
  updateMany: z.union([ z.lazy(() => UserReviewUpdateManyWithWhereWithoutUserInputSchema),z.lazy(() => UserReviewUpdateManyWithWhereWithoutUserInputSchema).array() ]).optional(),
  deleteMany: z.union([ z.lazy(() => UserReviewScalarWhereInputSchema),z.lazy(() => UserReviewScalarWhereInputSchema).array() ]).optional(),
}).strict();

export const NestedIntFilterSchema: z.ZodType<Prisma.NestedIntFilter> = z.object({
  equals: z.number().optional(),
  in: z.number().array().optional(),
  notIn: z.number().array().optional(),
  lt: z.number().optional(),
  lte: z.number().optional(),
  gt: z.number().optional(),
  gte: z.number().optional(),
  not: z.union([ z.number(),z.lazy(() => NestedIntFilterSchema) ]).optional(),
}).strict();

export const NestedFloatFilterSchema: z.ZodType<Prisma.NestedFloatFilter> = z.object({
  equals: z.number().optional(),
  in: z.number().array().optional(),
  notIn: z.number().array().optional(),
  lt: z.number().optional(),
  lte: z.number().optional(),
  gt: z.number().optional(),
  gte: z.number().optional(),
  not: z.union([ z.number(),z.lazy(() => NestedFloatFilterSchema) ]).optional(),
}).strict();

export const NestedStringNullableFilterSchema: z.ZodType<Prisma.NestedStringNullableFilter> = z.object({
  equals: z.string().optional().nullable(),
  in: z.string().array().optional().nullable(),
  notIn: z.string().array().optional().nullable(),
  lt: z.string().optional(),
  lte: z.string().optional(),
  gt: z.string().optional(),
  gte: z.string().optional(),
  contains: z.string().optional(),
  startsWith: z.string().optional(),
  endsWith: z.string().optional(),
  not: z.union([ z.string(),z.lazy(() => NestedStringNullableFilterSchema) ]).optional().nullable(),
}).strict();

export const NestedDateTimeNullableFilterSchema: z.ZodType<Prisma.NestedDateTimeNullableFilter> = z.object({
  equals: z.coerce.date().optional().nullable(),
  in: z.coerce.date().array().optional().nullable(),
  notIn: z.coerce.date().array().optional().nullable(),
  lt: z.coerce.date().optional(),
  lte: z.coerce.date().optional(),
  gt: z.coerce.date().optional(),
  gte: z.coerce.date().optional(),
  not: z.union([ z.coerce.date(),z.lazy(() => NestedDateTimeNullableFilterSchema) ]).optional().nullable(),
}).strict();

export const NestedIntWithAggregatesFilterSchema: z.ZodType<Prisma.NestedIntWithAggregatesFilter> = z.object({
  equals: z.number().optional(),
  in: z.number().array().optional(),
  notIn: z.number().array().optional(),
  lt: z.number().optional(),
  lte: z.number().optional(),
  gt: z.number().optional(),
  gte: z.number().optional(),
  not: z.union([ z.number(),z.lazy(() => NestedIntWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _avg: z.lazy(() => NestedFloatFilterSchema).optional(),
  _sum: z.lazy(() => NestedIntFilterSchema).optional(),
  _min: z.lazy(() => NestedIntFilterSchema).optional(),
  _max: z.lazy(() => NestedIntFilterSchema).optional()
}).strict();

export const NestedFloatWithAggregatesFilterSchema: z.ZodType<Prisma.NestedFloatWithAggregatesFilter> = z.object({
  equals: z.number().optional(),
  in: z.number().array().optional(),
  notIn: z.number().array().optional(),
  lt: z.number().optional(),
  lte: z.number().optional(),
  gt: z.number().optional(),
  gte: z.number().optional(),
  not: z.union([ z.number(),z.lazy(() => NestedFloatWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _avg: z.lazy(() => NestedFloatFilterSchema).optional(),
  _sum: z.lazy(() => NestedFloatFilterSchema).optional(),
  _min: z.lazy(() => NestedFloatFilterSchema).optional(),
  _max: z.lazy(() => NestedFloatFilterSchema).optional()
}).strict();

export const NestedStringNullableWithAggregatesFilterSchema: z.ZodType<Prisma.NestedStringNullableWithAggregatesFilter> = z.object({
  equals: z.string().optional().nullable(),
  in: z.string().array().optional().nullable(),
  notIn: z.string().array().optional().nullable(),
  lt: z.string().optional(),
  lte: z.string().optional(),
  gt: z.string().optional(),
  gte: z.string().optional(),
  contains: z.string().optional(),
  startsWith: z.string().optional(),
  endsWith: z.string().optional(),
  not: z.union([ z.string(),z.lazy(() => NestedStringNullableWithAggregatesFilterSchema) ]).optional().nullable(),
  _count: z.lazy(() => NestedIntNullableFilterSchema).optional(),
  _min: z.lazy(() => NestedStringNullableFilterSchema).optional(),
  _max: z.lazy(() => NestedStringNullableFilterSchema).optional()
}).strict();

export const NestedIntNullableFilterSchema: z.ZodType<Prisma.NestedIntNullableFilter> = z.object({
  equals: z.number().optional().nullable(),
  in: z.number().array().optional().nullable(),
  notIn: z.number().array().optional().nullable(),
  lt: z.number().optional(),
  lte: z.number().optional(),
  gt: z.number().optional(),
  gte: z.number().optional(),
  not: z.union([ z.number(),z.lazy(() => NestedIntNullableFilterSchema) ]).optional().nullable(),
}).strict();

export const NestedDateTimeNullableWithAggregatesFilterSchema: z.ZodType<Prisma.NestedDateTimeNullableWithAggregatesFilter> = z.object({
  equals: z.coerce.date().optional().nullable(),
  in: z.coerce.date().array().optional().nullable(),
  notIn: z.coerce.date().array().optional().nullable(),
  lt: z.coerce.date().optional(),
  lte: z.coerce.date().optional(),
  gt: z.coerce.date().optional(),
  gte: z.coerce.date().optional(),
  not: z.union([ z.coerce.date(),z.lazy(() => NestedDateTimeNullableWithAggregatesFilterSchema) ]).optional().nullable(),
  _count: z.lazy(() => NestedIntNullableFilterSchema).optional(),
  _min: z.lazy(() => NestedDateTimeNullableFilterSchema).optional(),
  _max: z.lazy(() => NestedDateTimeNullableFilterSchema).optional()
}).strict();

export const NestedIntNullableWithAggregatesFilterSchema: z.ZodType<Prisma.NestedIntNullableWithAggregatesFilter> = z.object({
  equals: z.number().optional().nullable(),
  in: z.number().array().optional().nullable(),
  notIn: z.number().array().optional().nullable(),
  lt: z.number().optional(),
  lte: z.number().optional(),
  gt: z.number().optional(),
  gte: z.number().optional(),
  not: z.union([ z.number(),z.lazy(() => NestedIntNullableWithAggregatesFilterSchema) ]).optional().nullable(),
  _count: z.lazy(() => NestedIntNullableFilterSchema).optional(),
  _avg: z.lazy(() => NestedFloatNullableFilterSchema).optional(),
  _sum: z.lazy(() => NestedIntNullableFilterSchema).optional(),
  _min: z.lazy(() => NestedIntNullableFilterSchema).optional(),
  _max: z.lazy(() => NestedIntNullableFilterSchema).optional()
}).strict();

export const NestedFloatNullableFilterSchema: z.ZodType<Prisma.NestedFloatNullableFilter> = z.object({
  equals: z.number().optional().nullable(),
  in: z.number().array().optional().nullable(),
  notIn: z.number().array().optional().nullable(),
  lt: z.number().optional(),
  lte: z.number().optional(),
  gt: z.number().optional(),
  gte: z.number().optional(),
  not: z.union([ z.number(),z.lazy(() => NestedFloatNullableFilterSchema) ]).optional().nullable(),
}).strict();

export const NestedStringFilterSchema: z.ZodType<Prisma.NestedStringFilter> = z.object({
  equals: z.string().optional(),
  in: z.string().array().optional(),
  notIn: z.string().array().optional(),
  lt: z.string().optional(),
  lte: z.string().optional(),
  gt: z.string().optional(),
  gte: z.string().optional(),
  contains: z.string().optional(),
  startsWith: z.string().optional(),
  endsWith: z.string().optional(),
  not: z.union([ z.string(),z.lazy(() => NestedStringFilterSchema) ]).optional(),
}).strict();

export const NestedStringWithAggregatesFilterSchema: z.ZodType<Prisma.NestedStringWithAggregatesFilter> = z.object({
  equals: z.string().optional(),
  in: z.string().array().optional(),
  notIn: z.string().array().optional(),
  lt: z.string().optional(),
  lte: z.string().optional(),
  gt: z.string().optional(),
  gte: z.string().optional(),
  contains: z.string().optional(),
  startsWith: z.string().optional(),
  endsWith: z.string().optional(),
  not: z.union([ z.string(),z.lazy(() => NestedStringWithAggregatesFilterSchema) ]).optional(),
  _count: z.lazy(() => NestedIntFilterSchema).optional(),
  _min: z.lazy(() => NestedStringFilterSchema).optional(),
  _max: z.lazy(() => NestedStringFilterSchema).optional()
}).strict();

export const UserCreateWithoutBug_reportsInputSchema: z.ZodType<Prisma.UserCreateWithoutBug_reportsInput> = z.object({
  kakao_id: z.string(),
  name: z.string().optional().nullable(),
  phone_number: z.string().optional().nullable(),
  location: z.string().optional().nullable(),
  gender: z.string().optional().nullable(),
  role: z.string().optional().nullable(),
  hunt_count: z.number().int().optional().nullable(),
  age_group: z.string().optional().nullable(),
  email: z.string().optional().nullable(),
  password: z.string().optional().nullable(),
  created_at: z.coerce.date().optional().nullable(),
  updated_at: z.coerce.date().optional().nullable(),
  terms_accepted: z.number().int().optional().nullable(),
  hunter_matches: z.lazy(() => MatchCreateNestedManyWithoutHunterInputSchema).optional(),
  helper_matches: z.lazy(() => MatchCreateNestedManyWithoutHelperInputSchema).optional(),
  user_reviews: z.lazy(() => UserReviewCreateNestedManyWithoutUserInputSchema).optional()
}).strict();

export const UserUncheckedCreateWithoutBug_reportsInputSchema: z.ZodType<Prisma.UserUncheckedCreateWithoutBug_reportsInput> = z.object({
  id: z.number().int().optional(),
  kakao_id: z.string(),
  name: z.string().optional().nullable(),
  phone_number: z.string().optional().nullable(),
  location: z.string().optional().nullable(),
  gender: z.string().optional().nullable(),
  role: z.string().optional().nullable(),
  hunt_count: z.number().int().optional().nullable(),
  age_group: z.string().optional().nullable(),
  email: z.string().optional().nullable(),
  password: z.string().optional().nullable(),
  created_at: z.coerce.date().optional().nullable(),
  updated_at: z.coerce.date().optional().nullable(),
  terms_accepted: z.number().int().optional().nullable(),
  hunter_matches: z.lazy(() => MatchUncheckedCreateNestedManyWithoutHunterInputSchema).optional(),
  helper_matches: z.lazy(() => MatchUncheckedCreateNestedManyWithoutHelperInputSchema).optional(),
  user_reviews: z.lazy(() => UserReviewUncheckedCreateNestedManyWithoutUserInputSchema).optional()
}).strict();

export const UserCreateOrConnectWithoutBug_reportsInputSchema: z.ZodType<Prisma.UserCreateOrConnectWithoutBug_reportsInput> = z.object({
  where: z.lazy(() => UserWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => UserCreateWithoutBug_reportsInputSchema),z.lazy(() => UserUncheckedCreateWithoutBug_reportsInputSchema) ]),
}).strict();

export const MatchCreateWithoutBug_reportInputSchema: z.ZodType<Prisma.MatchCreateWithoutBug_reportInput> = z.object({
  status: z.string().optional().nullable(),
  created_at: z.coerce.date().optional().nullable(),
  accepted_at: z.coerce.date().optional().nullable(),
  rejected_at: z.coerce.date().optional().nullable(),
  chats: z.lazy(() => ChatCreateNestedManyWithoutMatchInputSchema).optional(),
  hunter: z.lazy(() => UserCreateNestedOneWithoutHunter_matchesInputSchema),
  helper: z.lazy(() => UserCreateNestedOneWithoutHelper_matchesInputSchema)
}).strict();

export const MatchUncheckedCreateWithoutBug_reportInputSchema: z.ZodType<Prisma.MatchUncheckedCreateWithoutBug_reportInput> = z.object({
  id: z.number().int().optional(),
  helper_id: z.number().int(),
  hunter_id: z.number().int(),
  status: z.string().optional().nullable(),
  created_at: z.coerce.date().optional().nullable(),
  accepted_at: z.coerce.date().optional().nullable(),
  rejected_at: z.coerce.date().optional().nullable(),
  chats: z.lazy(() => ChatUncheckedCreateNestedManyWithoutMatchInputSchema).optional()
}).strict();

export const MatchCreateOrConnectWithoutBug_reportInputSchema: z.ZodType<Prisma.MatchCreateOrConnectWithoutBug_reportInput> = z.object({
  where: z.lazy(() => MatchWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => MatchCreateWithoutBug_reportInputSchema),z.lazy(() => MatchUncheckedCreateWithoutBug_reportInputSchema) ]),
}).strict();

export const MatchCreateManyBug_reportInputEnvelopeSchema: z.ZodType<Prisma.MatchCreateManyBug_reportInputEnvelope> = z.object({
  data: z.union([ z.lazy(() => MatchCreateManyBug_reportInputSchema),z.lazy(() => MatchCreateManyBug_reportInputSchema).array() ]),
  skipDuplicates: z.boolean().optional()
}).strict();

export const UserUpsertWithoutBug_reportsInputSchema: z.ZodType<Prisma.UserUpsertWithoutBug_reportsInput> = z.object({
  update: z.union([ z.lazy(() => UserUpdateWithoutBug_reportsInputSchema),z.lazy(() => UserUncheckedUpdateWithoutBug_reportsInputSchema) ]),
  create: z.union([ z.lazy(() => UserCreateWithoutBug_reportsInputSchema),z.lazy(() => UserUncheckedCreateWithoutBug_reportsInputSchema) ]),
  where: z.lazy(() => UserWhereInputSchema).optional()
}).strict();

export const UserUpdateToOneWithWhereWithoutBug_reportsInputSchema: z.ZodType<Prisma.UserUpdateToOneWithWhereWithoutBug_reportsInput> = z.object({
  where: z.lazy(() => UserWhereInputSchema).optional(),
  data: z.union([ z.lazy(() => UserUpdateWithoutBug_reportsInputSchema),z.lazy(() => UserUncheckedUpdateWithoutBug_reportsInputSchema) ]),
}).strict();

export const UserUpdateWithoutBug_reportsInputSchema: z.ZodType<Prisma.UserUpdateWithoutBug_reportsInput> = z.object({
  kakao_id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  phone_number: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  location: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  gender: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  role: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  hunt_count: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  age_group: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  email: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  password: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  created_at: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  updated_at: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  terms_accepted: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  hunter_matches: z.lazy(() => MatchUpdateManyWithoutHunterNestedInputSchema).optional(),
  helper_matches: z.lazy(() => MatchUpdateManyWithoutHelperNestedInputSchema).optional(),
  user_reviews: z.lazy(() => UserReviewUpdateManyWithoutUserNestedInputSchema).optional()
}).strict();

export const UserUncheckedUpdateWithoutBug_reportsInputSchema: z.ZodType<Prisma.UserUncheckedUpdateWithoutBug_reportsInput> = z.object({
  id: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  kakao_id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  phone_number: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  location: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  gender: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  role: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  hunt_count: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  age_group: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  email: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  password: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  created_at: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  updated_at: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  terms_accepted: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  hunter_matches: z.lazy(() => MatchUncheckedUpdateManyWithoutHunterNestedInputSchema).optional(),
  helper_matches: z.lazy(() => MatchUncheckedUpdateManyWithoutHelperNestedInputSchema).optional(),
  user_reviews: z.lazy(() => UserReviewUncheckedUpdateManyWithoutUserNestedInputSchema).optional()
}).strict();

export const MatchUpsertWithWhereUniqueWithoutBug_reportInputSchema: z.ZodType<Prisma.MatchUpsertWithWhereUniqueWithoutBug_reportInput> = z.object({
  where: z.lazy(() => MatchWhereUniqueInputSchema),
  update: z.union([ z.lazy(() => MatchUpdateWithoutBug_reportInputSchema),z.lazy(() => MatchUncheckedUpdateWithoutBug_reportInputSchema) ]),
  create: z.union([ z.lazy(() => MatchCreateWithoutBug_reportInputSchema),z.lazy(() => MatchUncheckedCreateWithoutBug_reportInputSchema) ]),
}).strict();

export const MatchUpdateWithWhereUniqueWithoutBug_reportInputSchema: z.ZodType<Prisma.MatchUpdateWithWhereUniqueWithoutBug_reportInput> = z.object({
  where: z.lazy(() => MatchWhereUniqueInputSchema),
  data: z.union([ z.lazy(() => MatchUpdateWithoutBug_reportInputSchema),z.lazy(() => MatchUncheckedUpdateWithoutBug_reportInputSchema) ]),
}).strict();

export const MatchUpdateManyWithWhereWithoutBug_reportInputSchema: z.ZodType<Prisma.MatchUpdateManyWithWhereWithoutBug_reportInput> = z.object({
  where: z.lazy(() => MatchScalarWhereInputSchema),
  data: z.union([ z.lazy(() => MatchUpdateManyMutationInputSchema),z.lazy(() => MatchUncheckedUpdateManyWithoutBug_reportInputSchema) ]),
}).strict();

export const MatchScalarWhereInputSchema: z.ZodType<Prisma.MatchScalarWhereInput> = z.object({
  AND: z.union([ z.lazy(() => MatchScalarWhereInputSchema),z.lazy(() => MatchScalarWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => MatchScalarWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => MatchScalarWhereInputSchema),z.lazy(() => MatchScalarWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => IntFilterSchema),z.number() ]).optional(),
  bug_report_id: z.union([ z.lazy(() => IntNullableFilterSchema),z.number() ]).optional().nullable(),
  helper_id: z.union([ z.lazy(() => IntFilterSchema),z.number() ]).optional(),
  hunter_id: z.union([ z.lazy(() => IntFilterSchema),z.number() ]).optional(),
  status: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  created_at: z.union([ z.lazy(() => DateTimeNullableFilterSchema),z.coerce.date() ]).optional().nullable(),
  accepted_at: z.union([ z.lazy(() => DateTimeNullableFilterSchema),z.coerce.date() ]).optional().nullable(),
  rejected_at: z.union([ z.lazy(() => DateTimeNullableFilterSchema),z.coerce.date() ]).optional().nullable(),
}).strict();

export const MatchCreateWithoutChatsInputSchema: z.ZodType<Prisma.MatchCreateWithoutChatsInput> = z.object({
  status: z.string().optional().nullable(),
  created_at: z.coerce.date().optional().nullable(),
  accepted_at: z.coerce.date().optional().nullable(),
  rejected_at: z.coerce.date().optional().nullable(),
  bug_report: z.lazy(() => BugReportCreateNestedOneWithoutMatchesInputSchema).optional(),
  hunter: z.lazy(() => UserCreateNestedOneWithoutHunter_matchesInputSchema),
  helper: z.lazy(() => UserCreateNestedOneWithoutHelper_matchesInputSchema)
}).strict();

export const MatchUncheckedCreateWithoutChatsInputSchema: z.ZodType<Prisma.MatchUncheckedCreateWithoutChatsInput> = z.object({
  id: z.number().int().optional(),
  bug_report_id: z.number().int().optional().nullable(),
  helper_id: z.number().int(),
  hunter_id: z.number().int(),
  status: z.string().optional().nullable(),
  created_at: z.coerce.date().optional().nullable(),
  accepted_at: z.coerce.date().optional().nullable(),
  rejected_at: z.coerce.date().optional().nullable()
}).strict();

export const MatchCreateOrConnectWithoutChatsInputSchema: z.ZodType<Prisma.MatchCreateOrConnectWithoutChatsInput> = z.object({
  where: z.lazy(() => MatchWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => MatchCreateWithoutChatsInputSchema),z.lazy(() => MatchUncheckedCreateWithoutChatsInputSchema) ]),
}).strict();

export const MatchUpsertWithoutChatsInputSchema: z.ZodType<Prisma.MatchUpsertWithoutChatsInput> = z.object({
  update: z.union([ z.lazy(() => MatchUpdateWithoutChatsInputSchema),z.lazy(() => MatchUncheckedUpdateWithoutChatsInputSchema) ]),
  create: z.union([ z.lazy(() => MatchCreateWithoutChatsInputSchema),z.lazy(() => MatchUncheckedCreateWithoutChatsInputSchema) ]),
  where: z.lazy(() => MatchWhereInputSchema).optional()
}).strict();

export const MatchUpdateToOneWithWhereWithoutChatsInputSchema: z.ZodType<Prisma.MatchUpdateToOneWithWhereWithoutChatsInput> = z.object({
  where: z.lazy(() => MatchWhereInputSchema).optional(),
  data: z.union([ z.lazy(() => MatchUpdateWithoutChatsInputSchema),z.lazy(() => MatchUncheckedUpdateWithoutChatsInputSchema) ]),
}).strict();

export const MatchUpdateWithoutChatsInputSchema: z.ZodType<Prisma.MatchUpdateWithoutChatsInput> = z.object({
  status: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  created_at: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  accepted_at: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  rejected_at: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  bug_report: z.lazy(() => BugReportUpdateOneWithoutMatchesNestedInputSchema).optional(),
  hunter: z.lazy(() => UserUpdateOneRequiredWithoutHunter_matchesNestedInputSchema).optional(),
  helper: z.lazy(() => UserUpdateOneRequiredWithoutHelper_matchesNestedInputSchema).optional()
}).strict();

export const MatchUncheckedUpdateWithoutChatsInputSchema: z.ZodType<Prisma.MatchUncheckedUpdateWithoutChatsInput> = z.object({
  id: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  bug_report_id: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  helper_id: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  hunter_id: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  status: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  created_at: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  accepted_at: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  rejected_at: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
}).strict();

export const ChatCreateWithoutMatchInputSchema: z.ZodType<Prisma.ChatCreateWithoutMatchInput> = z.object({
  status: z.string().optional().nullable(),
  created_at: z.coerce.date().optional().nullable(),
  blocked_at: z.coerce.date().optional().nullable()
}).strict();

export const ChatUncheckedCreateWithoutMatchInputSchema: z.ZodType<Prisma.ChatUncheckedCreateWithoutMatchInput> = z.object({
  id: z.number().int().optional(),
  status: z.string().optional().nullable(),
  created_at: z.coerce.date().optional().nullable(),
  blocked_at: z.coerce.date().optional().nullable()
}).strict();

export const ChatCreateOrConnectWithoutMatchInputSchema: z.ZodType<Prisma.ChatCreateOrConnectWithoutMatchInput> = z.object({
  where: z.lazy(() => ChatWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => ChatCreateWithoutMatchInputSchema),z.lazy(() => ChatUncheckedCreateWithoutMatchInputSchema) ]),
}).strict();

export const ChatCreateManyMatchInputEnvelopeSchema: z.ZodType<Prisma.ChatCreateManyMatchInputEnvelope> = z.object({
  data: z.union([ z.lazy(() => ChatCreateManyMatchInputSchema),z.lazy(() => ChatCreateManyMatchInputSchema).array() ]),
  skipDuplicates: z.boolean().optional()
}).strict();

export const BugReportCreateWithoutMatchesInputSchema: z.ZodType<Prisma.BugReportCreateWithoutMatchesInput> = z.object({
  latitude: z.number(),
  longitude: z.number(),
  bug_image_url: z.string().optional().nullable(),
  bug_type: z.string().optional().nullable(),
  bug_size: z.string().optional().nullable(),
  equipment: z.string().optional().nullable(),
  price: z.string().optional().nullable(),
  note: z.string().optional().nullable(),
  created_at: z.coerce.date().optional().nullable(),
  status: z.string().optional().nullable(),
  title: z.string().optional().nullable(),
  user: z.lazy(() => UserCreateNestedOneWithoutBug_reportsInputSchema)
}).strict();

export const BugReportUncheckedCreateWithoutMatchesInputSchema: z.ZodType<Prisma.BugReportUncheckedCreateWithoutMatchesInput> = z.object({
  id: z.number().int().optional(),
  latitude: z.number(),
  longitude: z.number(),
  user_id: z.number().int(),
  bug_image_url: z.string().optional().nullable(),
  bug_type: z.string().optional().nullable(),
  bug_size: z.string().optional().nullable(),
  equipment: z.string().optional().nullable(),
  price: z.string().optional().nullable(),
  note: z.string().optional().nullable(),
  created_at: z.coerce.date().optional().nullable(),
  status: z.string().optional().nullable(),
  title: z.string().optional().nullable()
}).strict();

export const BugReportCreateOrConnectWithoutMatchesInputSchema: z.ZodType<Prisma.BugReportCreateOrConnectWithoutMatchesInput> = z.object({
  where: z.lazy(() => BugReportWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => BugReportCreateWithoutMatchesInputSchema),z.lazy(() => BugReportUncheckedCreateWithoutMatchesInputSchema) ]),
}).strict();

export const UserCreateWithoutHunter_matchesInputSchema: z.ZodType<Prisma.UserCreateWithoutHunter_matchesInput> = z.object({
  kakao_id: z.string(),
  name: z.string().optional().nullable(),
  phone_number: z.string().optional().nullable(),
  location: z.string().optional().nullable(),
  gender: z.string().optional().nullable(),
  role: z.string().optional().nullable(),
  hunt_count: z.number().int().optional().nullable(),
  age_group: z.string().optional().nullable(),
  email: z.string().optional().nullable(),
  password: z.string().optional().nullable(),
  created_at: z.coerce.date().optional().nullable(),
  updated_at: z.coerce.date().optional().nullable(),
  terms_accepted: z.number().int().optional().nullable(),
  bug_reports: z.lazy(() => BugReportCreateNestedManyWithoutUserInputSchema).optional(),
  helper_matches: z.lazy(() => MatchCreateNestedManyWithoutHelperInputSchema).optional(),
  user_reviews: z.lazy(() => UserReviewCreateNestedManyWithoutUserInputSchema).optional()
}).strict();

export const UserUncheckedCreateWithoutHunter_matchesInputSchema: z.ZodType<Prisma.UserUncheckedCreateWithoutHunter_matchesInput> = z.object({
  id: z.number().int().optional(),
  kakao_id: z.string(),
  name: z.string().optional().nullable(),
  phone_number: z.string().optional().nullable(),
  location: z.string().optional().nullable(),
  gender: z.string().optional().nullable(),
  role: z.string().optional().nullable(),
  hunt_count: z.number().int().optional().nullable(),
  age_group: z.string().optional().nullable(),
  email: z.string().optional().nullable(),
  password: z.string().optional().nullable(),
  created_at: z.coerce.date().optional().nullable(),
  updated_at: z.coerce.date().optional().nullable(),
  terms_accepted: z.number().int().optional().nullable(),
  bug_reports: z.lazy(() => BugReportUncheckedCreateNestedManyWithoutUserInputSchema).optional(),
  helper_matches: z.lazy(() => MatchUncheckedCreateNestedManyWithoutHelperInputSchema).optional(),
  user_reviews: z.lazy(() => UserReviewUncheckedCreateNestedManyWithoutUserInputSchema).optional()
}).strict();

export const UserCreateOrConnectWithoutHunter_matchesInputSchema: z.ZodType<Prisma.UserCreateOrConnectWithoutHunter_matchesInput> = z.object({
  where: z.lazy(() => UserWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => UserCreateWithoutHunter_matchesInputSchema),z.lazy(() => UserUncheckedCreateWithoutHunter_matchesInputSchema) ]),
}).strict();

export const UserCreateWithoutHelper_matchesInputSchema: z.ZodType<Prisma.UserCreateWithoutHelper_matchesInput> = z.object({
  kakao_id: z.string(),
  name: z.string().optional().nullable(),
  phone_number: z.string().optional().nullable(),
  location: z.string().optional().nullable(),
  gender: z.string().optional().nullable(),
  role: z.string().optional().nullable(),
  hunt_count: z.number().int().optional().nullable(),
  age_group: z.string().optional().nullable(),
  email: z.string().optional().nullable(),
  password: z.string().optional().nullable(),
  created_at: z.coerce.date().optional().nullable(),
  updated_at: z.coerce.date().optional().nullable(),
  terms_accepted: z.number().int().optional().nullable(),
  bug_reports: z.lazy(() => BugReportCreateNestedManyWithoutUserInputSchema).optional(),
  hunter_matches: z.lazy(() => MatchCreateNestedManyWithoutHunterInputSchema).optional(),
  user_reviews: z.lazy(() => UserReviewCreateNestedManyWithoutUserInputSchema).optional()
}).strict();

export const UserUncheckedCreateWithoutHelper_matchesInputSchema: z.ZodType<Prisma.UserUncheckedCreateWithoutHelper_matchesInput> = z.object({
  id: z.number().int().optional(),
  kakao_id: z.string(),
  name: z.string().optional().nullable(),
  phone_number: z.string().optional().nullable(),
  location: z.string().optional().nullable(),
  gender: z.string().optional().nullable(),
  role: z.string().optional().nullable(),
  hunt_count: z.number().int().optional().nullable(),
  age_group: z.string().optional().nullable(),
  email: z.string().optional().nullable(),
  password: z.string().optional().nullable(),
  created_at: z.coerce.date().optional().nullable(),
  updated_at: z.coerce.date().optional().nullable(),
  terms_accepted: z.number().int().optional().nullable(),
  bug_reports: z.lazy(() => BugReportUncheckedCreateNestedManyWithoutUserInputSchema).optional(),
  hunter_matches: z.lazy(() => MatchUncheckedCreateNestedManyWithoutHunterInputSchema).optional(),
  user_reviews: z.lazy(() => UserReviewUncheckedCreateNestedManyWithoutUserInputSchema).optional()
}).strict();

export const UserCreateOrConnectWithoutHelper_matchesInputSchema: z.ZodType<Prisma.UserCreateOrConnectWithoutHelper_matchesInput> = z.object({
  where: z.lazy(() => UserWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => UserCreateWithoutHelper_matchesInputSchema),z.lazy(() => UserUncheckedCreateWithoutHelper_matchesInputSchema) ]),
}).strict();

export const ChatUpsertWithWhereUniqueWithoutMatchInputSchema: z.ZodType<Prisma.ChatUpsertWithWhereUniqueWithoutMatchInput> = z.object({
  where: z.lazy(() => ChatWhereUniqueInputSchema),
  update: z.union([ z.lazy(() => ChatUpdateWithoutMatchInputSchema),z.lazy(() => ChatUncheckedUpdateWithoutMatchInputSchema) ]),
  create: z.union([ z.lazy(() => ChatCreateWithoutMatchInputSchema),z.lazy(() => ChatUncheckedCreateWithoutMatchInputSchema) ]),
}).strict();

export const ChatUpdateWithWhereUniqueWithoutMatchInputSchema: z.ZodType<Prisma.ChatUpdateWithWhereUniqueWithoutMatchInput> = z.object({
  where: z.lazy(() => ChatWhereUniqueInputSchema),
  data: z.union([ z.lazy(() => ChatUpdateWithoutMatchInputSchema),z.lazy(() => ChatUncheckedUpdateWithoutMatchInputSchema) ]),
}).strict();

export const ChatUpdateManyWithWhereWithoutMatchInputSchema: z.ZodType<Prisma.ChatUpdateManyWithWhereWithoutMatchInput> = z.object({
  where: z.lazy(() => ChatScalarWhereInputSchema),
  data: z.union([ z.lazy(() => ChatUpdateManyMutationInputSchema),z.lazy(() => ChatUncheckedUpdateManyWithoutMatchInputSchema) ]),
}).strict();

export const ChatScalarWhereInputSchema: z.ZodType<Prisma.ChatScalarWhereInput> = z.object({
  AND: z.union([ z.lazy(() => ChatScalarWhereInputSchema),z.lazy(() => ChatScalarWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => ChatScalarWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => ChatScalarWhereInputSchema),z.lazy(() => ChatScalarWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => IntFilterSchema),z.number() ]).optional(),
  match_id: z.union([ z.lazy(() => IntNullableFilterSchema),z.number() ]).optional().nullable(),
  status: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  created_at: z.union([ z.lazy(() => DateTimeNullableFilterSchema),z.coerce.date() ]).optional().nullable(),
  blocked_at: z.union([ z.lazy(() => DateTimeNullableFilterSchema),z.coerce.date() ]).optional().nullable(),
}).strict();

export const BugReportUpsertWithoutMatchesInputSchema: z.ZodType<Prisma.BugReportUpsertWithoutMatchesInput> = z.object({
  update: z.union([ z.lazy(() => BugReportUpdateWithoutMatchesInputSchema),z.lazy(() => BugReportUncheckedUpdateWithoutMatchesInputSchema) ]),
  create: z.union([ z.lazy(() => BugReportCreateWithoutMatchesInputSchema),z.lazy(() => BugReportUncheckedCreateWithoutMatchesInputSchema) ]),
  where: z.lazy(() => BugReportWhereInputSchema).optional()
}).strict();

export const BugReportUpdateToOneWithWhereWithoutMatchesInputSchema: z.ZodType<Prisma.BugReportUpdateToOneWithWhereWithoutMatchesInput> = z.object({
  where: z.lazy(() => BugReportWhereInputSchema).optional(),
  data: z.union([ z.lazy(() => BugReportUpdateWithoutMatchesInputSchema),z.lazy(() => BugReportUncheckedUpdateWithoutMatchesInputSchema) ]),
}).strict();

export const BugReportUpdateWithoutMatchesInputSchema: z.ZodType<Prisma.BugReportUpdateWithoutMatchesInput> = z.object({
  latitude: z.union([ z.number(),z.lazy(() => FloatFieldUpdateOperationsInputSchema) ]).optional(),
  longitude: z.union([ z.number(),z.lazy(() => FloatFieldUpdateOperationsInputSchema) ]).optional(),
  bug_image_url: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  bug_type: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  bug_size: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  equipment: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  price: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  note: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  created_at: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  status: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  title: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  user: z.lazy(() => UserUpdateOneRequiredWithoutBug_reportsNestedInputSchema).optional()
}).strict();

export const BugReportUncheckedUpdateWithoutMatchesInputSchema: z.ZodType<Prisma.BugReportUncheckedUpdateWithoutMatchesInput> = z.object({
  id: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  latitude: z.union([ z.number(),z.lazy(() => FloatFieldUpdateOperationsInputSchema) ]).optional(),
  longitude: z.union([ z.number(),z.lazy(() => FloatFieldUpdateOperationsInputSchema) ]).optional(),
  user_id: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  bug_image_url: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  bug_type: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  bug_size: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  equipment: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  price: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  note: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  created_at: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  status: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  title: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
}).strict();

export const UserUpsertWithoutHunter_matchesInputSchema: z.ZodType<Prisma.UserUpsertWithoutHunter_matchesInput> = z.object({
  update: z.union([ z.lazy(() => UserUpdateWithoutHunter_matchesInputSchema),z.lazy(() => UserUncheckedUpdateWithoutHunter_matchesInputSchema) ]),
  create: z.union([ z.lazy(() => UserCreateWithoutHunter_matchesInputSchema),z.lazy(() => UserUncheckedCreateWithoutHunter_matchesInputSchema) ]),
  where: z.lazy(() => UserWhereInputSchema).optional()
}).strict();

export const UserUpdateToOneWithWhereWithoutHunter_matchesInputSchema: z.ZodType<Prisma.UserUpdateToOneWithWhereWithoutHunter_matchesInput> = z.object({
  where: z.lazy(() => UserWhereInputSchema).optional(),
  data: z.union([ z.lazy(() => UserUpdateWithoutHunter_matchesInputSchema),z.lazy(() => UserUncheckedUpdateWithoutHunter_matchesInputSchema) ]),
}).strict();

export const UserUpdateWithoutHunter_matchesInputSchema: z.ZodType<Prisma.UserUpdateWithoutHunter_matchesInput> = z.object({
  kakao_id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  phone_number: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  location: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  gender: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  role: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  hunt_count: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  age_group: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  email: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  password: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  created_at: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  updated_at: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  terms_accepted: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  bug_reports: z.lazy(() => BugReportUpdateManyWithoutUserNestedInputSchema).optional(),
  helper_matches: z.lazy(() => MatchUpdateManyWithoutHelperNestedInputSchema).optional(),
  user_reviews: z.lazy(() => UserReviewUpdateManyWithoutUserNestedInputSchema).optional()
}).strict();

export const UserUncheckedUpdateWithoutHunter_matchesInputSchema: z.ZodType<Prisma.UserUncheckedUpdateWithoutHunter_matchesInput> = z.object({
  id: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  kakao_id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  phone_number: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  location: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  gender: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  role: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  hunt_count: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  age_group: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  email: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  password: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  created_at: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  updated_at: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  terms_accepted: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  bug_reports: z.lazy(() => BugReportUncheckedUpdateManyWithoutUserNestedInputSchema).optional(),
  helper_matches: z.lazy(() => MatchUncheckedUpdateManyWithoutHelperNestedInputSchema).optional(),
  user_reviews: z.lazy(() => UserReviewUncheckedUpdateManyWithoutUserNestedInputSchema).optional()
}).strict();

export const UserUpsertWithoutHelper_matchesInputSchema: z.ZodType<Prisma.UserUpsertWithoutHelper_matchesInput> = z.object({
  update: z.union([ z.lazy(() => UserUpdateWithoutHelper_matchesInputSchema),z.lazy(() => UserUncheckedUpdateWithoutHelper_matchesInputSchema) ]),
  create: z.union([ z.lazy(() => UserCreateWithoutHelper_matchesInputSchema),z.lazy(() => UserUncheckedCreateWithoutHelper_matchesInputSchema) ]),
  where: z.lazy(() => UserWhereInputSchema).optional()
}).strict();

export const UserUpdateToOneWithWhereWithoutHelper_matchesInputSchema: z.ZodType<Prisma.UserUpdateToOneWithWhereWithoutHelper_matchesInput> = z.object({
  where: z.lazy(() => UserWhereInputSchema).optional(),
  data: z.union([ z.lazy(() => UserUpdateWithoutHelper_matchesInputSchema),z.lazy(() => UserUncheckedUpdateWithoutHelper_matchesInputSchema) ]),
}).strict();

export const UserUpdateWithoutHelper_matchesInputSchema: z.ZodType<Prisma.UserUpdateWithoutHelper_matchesInput> = z.object({
  kakao_id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  phone_number: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  location: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  gender: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  role: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  hunt_count: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  age_group: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  email: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  password: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  created_at: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  updated_at: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  terms_accepted: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  bug_reports: z.lazy(() => BugReportUpdateManyWithoutUserNestedInputSchema).optional(),
  hunter_matches: z.lazy(() => MatchUpdateManyWithoutHunterNestedInputSchema).optional(),
  user_reviews: z.lazy(() => UserReviewUpdateManyWithoutUserNestedInputSchema).optional()
}).strict();

export const UserUncheckedUpdateWithoutHelper_matchesInputSchema: z.ZodType<Prisma.UserUncheckedUpdateWithoutHelper_matchesInput> = z.object({
  id: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  kakao_id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  phone_number: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  location: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  gender: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  role: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  hunt_count: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  age_group: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  email: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  password: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  created_at: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  updated_at: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  terms_accepted: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  bug_reports: z.lazy(() => BugReportUncheckedUpdateManyWithoutUserNestedInputSchema).optional(),
  hunter_matches: z.lazy(() => MatchUncheckedUpdateManyWithoutHunterNestedInputSchema).optional(),
  user_reviews: z.lazy(() => UserReviewUncheckedUpdateManyWithoutUserNestedInputSchema).optional()
}).strict();

export const UserCreateWithoutUser_reviewsInputSchema: z.ZodType<Prisma.UserCreateWithoutUser_reviewsInput> = z.object({
  kakao_id: z.string(),
  name: z.string().optional().nullable(),
  phone_number: z.string().optional().nullable(),
  location: z.string().optional().nullable(),
  gender: z.string().optional().nullable(),
  role: z.string().optional().nullable(),
  hunt_count: z.number().int().optional().nullable(),
  age_group: z.string().optional().nullable(),
  email: z.string().optional().nullable(),
  password: z.string().optional().nullable(),
  created_at: z.coerce.date().optional().nullable(),
  updated_at: z.coerce.date().optional().nullable(),
  terms_accepted: z.number().int().optional().nullable(),
  bug_reports: z.lazy(() => BugReportCreateNestedManyWithoutUserInputSchema).optional(),
  hunter_matches: z.lazy(() => MatchCreateNestedManyWithoutHunterInputSchema).optional(),
  helper_matches: z.lazy(() => MatchCreateNestedManyWithoutHelperInputSchema).optional()
}).strict();

export const UserUncheckedCreateWithoutUser_reviewsInputSchema: z.ZodType<Prisma.UserUncheckedCreateWithoutUser_reviewsInput> = z.object({
  id: z.number().int().optional(),
  kakao_id: z.string(),
  name: z.string().optional().nullable(),
  phone_number: z.string().optional().nullable(),
  location: z.string().optional().nullable(),
  gender: z.string().optional().nullable(),
  role: z.string().optional().nullable(),
  hunt_count: z.number().int().optional().nullable(),
  age_group: z.string().optional().nullable(),
  email: z.string().optional().nullable(),
  password: z.string().optional().nullable(),
  created_at: z.coerce.date().optional().nullable(),
  updated_at: z.coerce.date().optional().nullable(),
  terms_accepted: z.number().int().optional().nullable(),
  bug_reports: z.lazy(() => BugReportUncheckedCreateNestedManyWithoutUserInputSchema).optional(),
  hunter_matches: z.lazy(() => MatchUncheckedCreateNestedManyWithoutHunterInputSchema).optional(),
  helper_matches: z.lazy(() => MatchUncheckedCreateNestedManyWithoutHelperInputSchema).optional()
}).strict();

export const UserCreateOrConnectWithoutUser_reviewsInputSchema: z.ZodType<Prisma.UserCreateOrConnectWithoutUser_reviewsInput> = z.object({
  where: z.lazy(() => UserWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => UserCreateWithoutUser_reviewsInputSchema),z.lazy(() => UserUncheckedCreateWithoutUser_reviewsInputSchema) ]),
}).strict();

export const UserUpsertWithoutUser_reviewsInputSchema: z.ZodType<Prisma.UserUpsertWithoutUser_reviewsInput> = z.object({
  update: z.union([ z.lazy(() => UserUpdateWithoutUser_reviewsInputSchema),z.lazy(() => UserUncheckedUpdateWithoutUser_reviewsInputSchema) ]),
  create: z.union([ z.lazy(() => UserCreateWithoutUser_reviewsInputSchema),z.lazy(() => UserUncheckedCreateWithoutUser_reviewsInputSchema) ]),
  where: z.lazy(() => UserWhereInputSchema).optional()
}).strict();

export const UserUpdateToOneWithWhereWithoutUser_reviewsInputSchema: z.ZodType<Prisma.UserUpdateToOneWithWhereWithoutUser_reviewsInput> = z.object({
  where: z.lazy(() => UserWhereInputSchema).optional(),
  data: z.union([ z.lazy(() => UserUpdateWithoutUser_reviewsInputSchema),z.lazy(() => UserUncheckedUpdateWithoutUser_reviewsInputSchema) ]),
}).strict();

export const UserUpdateWithoutUser_reviewsInputSchema: z.ZodType<Prisma.UserUpdateWithoutUser_reviewsInput> = z.object({
  kakao_id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  phone_number: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  location: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  gender: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  role: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  hunt_count: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  age_group: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  email: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  password: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  created_at: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  updated_at: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  terms_accepted: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  bug_reports: z.lazy(() => BugReportUpdateManyWithoutUserNestedInputSchema).optional(),
  hunter_matches: z.lazy(() => MatchUpdateManyWithoutHunterNestedInputSchema).optional(),
  helper_matches: z.lazy(() => MatchUpdateManyWithoutHelperNestedInputSchema).optional()
}).strict();

export const UserUncheckedUpdateWithoutUser_reviewsInputSchema: z.ZodType<Prisma.UserUncheckedUpdateWithoutUser_reviewsInput> = z.object({
  id: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  kakao_id: z.union([ z.string(),z.lazy(() => StringFieldUpdateOperationsInputSchema) ]).optional(),
  name: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  phone_number: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  location: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  gender: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  role: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  hunt_count: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  age_group: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  email: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  password: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  created_at: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  updated_at: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  terms_accepted: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  bug_reports: z.lazy(() => BugReportUncheckedUpdateManyWithoutUserNestedInputSchema).optional(),
  hunter_matches: z.lazy(() => MatchUncheckedUpdateManyWithoutHunterNestedInputSchema).optional(),
  helper_matches: z.lazy(() => MatchUncheckedUpdateManyWithoutHelperNestedInputSchema).optional()
}).strict();

export const BugReportCreateWithoutUserInputSchema: z.ZodType<Prisma.BugReportCreateWithoutUserInput> = z.object({
  latitude: z.number(),
  longitude: z.number(),
  bug_image_url: z.string().optional().nullable(),
  bug_type: z.string().optional().nullable(),
  bug_size: z.string().optional().nullable(),
  equipment: z.string().optional().nullable(),
  price: z.string().optional().nullable(),
  note: z.string().optional().nullable(),
  created_at: z.coerce.date().optional().nullable(),
  status: z.string().optional().nullable(),
  title: z.string().optional().nullable(),
  matches: z.lazy(() => MatchCreateNestedManyWithoutBug_reportInputSchema).optional()
}).strict();

export const BugReportUncheckedCreateWithoutUserInputSchema: z.ZodType<Prisma.BugReportUncheckedCreateWithoutUserInput> = z.object({
  id: z.number().int().optional(),
  latitude: z.number(),
  longitude: z.number(),
  bug_image_url: z.string().optional().nullable(),
  bug_type: z.string().optional().nullable(),
  bug_size: z.string().optional().nullable(),
  equipment: z.string().optional().nullable(),
  price: z.string().optional().nullable(),
  note: z.string().optional().nullable(),
  created_at: z.coerce.date().optional().nullable(),
  status: z.string().optional().nullable(),
  title: z.string().optional().nullable(),
  matches: z.lazy(() => MatchUncheckedCreateNestedManyWithoutBug_reportInputSchema).optional()
}).strict();

export const BugReportCreateOrConnectWithoutUserInputSchema: z.ZodType<Prisma.BugReportCreateOrConnectWithoutUserInput> = z.object({
  where: z.lazy(() => BugReportWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => BugReportCreateWithoutUserInputSchema),z.lazy(() => BugReportUncheckedCreateWithoutUserInputSchema) ]),
}).strict();

export const BugReportCreateManyUserInputEnvelopeSchema: z.ZodType<Prisma.BugReportCreateManyUserInputEnvelope> = z.object({
  data: z.union([ z.lazy(() => BugReportCreateManyUserInputSchema),z.lazy(() => BugReportCreateManyUserInputSchema).array() ]),
  skipDuplicates: z.boolean().optional()
}).strict();

export const MatchCreateWithoutHunterInputSchema: z.ZodType<Prisma.MatchCreateWithoutHunterInput> = z.object({
  status: z.string().optional().nullable(),
  created_at: z.coerce.date().optional().nullable(),
  accepted_at: z.coerce.date().optional().nullable(),
  rejected_at: z.coerce.date().optional().nullable(),
  chats: z.lazy(() => ChatCreateNestedManyWithoutMatchInputSchema).optional(),
  bug_report: z.lazy(() => BugReportCreateNestedOneWithoutMatchesInputSchema).optional(),
  helper: z.lazy(() => UserCreateNestedOneWithoutHelper_matchesInputSchema)
}).strict();

export const MatchUncheckedCreateWithoutHunterInputSchema: z.ZodType<Prisma.MatchUncheckedCreateWithoutHunterInput> = z.object({
  id: z.number().int().optional(),
  bug_report_id: z.number().int().optional().nullable(),
  helper_id: z.number().int(),
  status: z.string().optional().nullable(),
  created_at: z.coerce.date().optional().nullable(),
  accepted_at: z.coerce.date().optional().nullable(),
  rejected_at: z.coerce.date().optional().nullable(),
  chats: z.lazy(() => ChatUncheckedCreateNestedManyWithoutMatchInputSchema).optional()
}).strict();

export const MatchCreateOrConnectWithoutHunterInputSchema: z.ZodType<Prisma.MatchCreateOrConnectWithoutHunterInput> = z.object({
  where: z.lazy(() => MatchWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => MatchCreateWithoutHunterInputSchema),z.lazy(() => MatchUncheckedCreateWithoutHunterInputSchema) ]),
}).strict();

export const MatchCreateManyHunterInputEnvelopeSchema: z.ZodType<Prisma.MatchCreateManyHunterInputEnvelope> = z.object({
  data: z.union([ z.lazy(() => MatchCreateManyHunterInputSchema),z.lazy(() => MatchCreateManyHunterInputSchema).array() ]),
  skipDuplicates: z.boolean().optional()
}).strict();

export const MatchCreateWithoutHelperInputSchema: z.ZodType<Prisma.MatchCreateWithoutHelperInput> = z.object({
  status: z.string().optional().nullable(),
  created_at: z.coerce.date().optional().nullable(),
  accepted_at: z.coerce.date().optional().nullable(),
  rejected_at: z.coerce.date().optional().nullable(),
  chats: z.lazy(() => ChatCreateNestedManyWithoutMatchInputSchema).optional(),
  bug_report: z.lazy(() => BugReportCreateNestedOneWithoutMatchesInputSchema).optional(),
  hunter: z.lazy(() => UserCreateNestedOneWithoutHunter_matchesInputSchema)
}).strict();

export const MatchUncheckedCreateWithoutHelperInputSchema: z.ZodType<Prisma.MatchUncheckedCreateWithoutHelperInput> = z.object({
  id: z.number().int().optional(),
  bug_report_id: z.number().int().optional().nullable(),
  hunter_id: z.number().int(),
  status: z.string().optional().nullable(),
  created_at: z.coerce.date().optional().nullable(),
  accepted_at: z.coerce.date().optional().nullable(),
  rejected_at: z.coerce.date().optional().nullable(),
  chats: z.lazy(() => ChatUncheckedCreateNestedManyWithoutMatchInputSchema).optional()
}).strict();

export const MatchCreateOrConnectWithoutHelperInputSchema: z.ZodType<Prisma.MatchCreateOrConnectWithoutHelperInput> = z.object({
  where: z.lazy(() => MatchWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => MatchCreateWithoutHelperInputSchema),z.lazy(() => MatchUncheckedCreateWithoutHelperInputSchema) ]),
}).strict();

export const MatchCreateManyHelperInputEnvelopeSchema: z.ZodType<Prisma.MatchCreateManyHelperInputEnvelope> = z.object({
  data: z.union([ z.lazy(() => MatchCreateManyHelperInputSchema),z.lazy(() => MatchCreateManyHelperInputSchema).array() ]),
  skipDuplicates: z.boolean().optional()
}).strict();

export const UserReviewCreateWithoutUserInputSchema: z.ZodType<Prisma.UserReviewCreateWithoutUserInput> = z.object({
  role: z.string().optional().nullable(),
  score: z.number().int().optional().nullable(),
  time_taken: z.number().int().optional().nullable(),
  price: z.number().int().optional().nullable(),
  review_note: z.string().optional().nullable(),
  created_at: z.coerce.date().optional().nullable()
}).strict();

export const UserReviewUncheckedCreateWithoutUserInputSchema: z.ZodType<Prisma.UserReviewUncheckedCreateWithoutUserInput> = z.object({
  id: z.number().int().optional(),
  role: z.string().optional().nullable(),
  score: z.number().int().optional().nullable(),
  time_taken: z.number().int().optional().nullable(),
  price: z.number().int().optional().nullable(),
  review_note: z.string().optional().nullable(),
  created_at: z.coerce.date().optional().nullable()
}).strict();

export const UserReviewCreateOrConnectWithoutUserInputSchema: z.ZodType<Prisma.UserReviewCreateOrConnectWithoutUserInput> = z.object({
  where: z.lazy(() => UserReviewWhereUniqueInputSchema),
  create: z.union([ z.lazy(() => UserReviewCreateWithoutUserInputSchema),z.lazy(() => UserReviewUncheckedCreateWithoutUserInputSchema) ]),
}).strict();

export const UserReviewCreateManyUserInputEnvelopeSchema: z.ZodType<Prisma.UserReviewCreateManyUserInputEnvelope> = z.object({
  data: z.union([ z.lazy(() => UserReviewCreateManyUserInputSchema),z.lazy(() => UserReviewCreateManyUserInputSchema).array() ]),
  skipDuplicates: z.boolean().optional()
}).strict();

export const BugReportUpsertWithWhereUniqueWithoutUserInputSchema: z.ZodType<Prisma.BugReportUpsertWithWhereUniqueWithoutUserInput> = z.object({
  where: z.lazy(() => BugReportWhereUniqueInputSchema),
  update: z.union([ z.lazy(() => BugReportUpdateWithoutUserInputSchema),z.lazy(() => BugReportUncheckedUpdateWithoutUserInputSchema) ]),
  create: z.union([ z.lazy(() => BugReportCreateWithoutUserInputSchema),z.lazy(() => BugReportUncheckedCreateWithoutUserInputSchema) ]),
}).strict();

export const BugReportUpdateWithWhereUniqueWithoutUserInputSchema: z.ZodType<Prisma.BugReportUpdateWithWhereUniqueWithoutUserInput> = z.object({
  where: z.lazy(() => BugReportWhereUniqueInputSchema),
  data: z.union([ z.lazy(() => BugReportUpdateWithoutUserInputSchema),z.lazy(() => BugReportUncheckedUpdateWithoutUserInputSchema) ]),
}).strict();

export const BugReportUpdateManyWithWhereWithoutUserInputSchema: z.ZodType<Prisma.BugReportUpdateManyWithWhereWithoutUserInput> = z.object({
  where: z.lazy(() => BugReportScalarWhereInputSchema),
  data: z.union([ z.lazy(() => BugReportUpdateManyMutationInputSchema),z.lazy(() => BugReportUncheckedUpdateManyWithoutUserInputSchema) ]),
}).strict();

export const BugReportScalarWhereInputSchema: z.ZodType<Prisma.BugReportScalarWhereInput> = z.object({
  AND: z.union([ z.lazy(() => BugReportScalarWhereInputSchema),z.lazy(() => BugReportScalarWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => BugReportScalarWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => BugReportScalarWhereInputSchema),z.lazy(() => BugReportScalarWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => IntFilterSchema),z.number() ]).optional(),
  latitude: z.union([ z.lazy(() => FloatFilterSchema),z.number() ]).optional(),
  longitude: z.union([ z.lazy(() => FloatFilterSchema),z.number() ]).optional(),
  user_id: z.union([ z.lazy(() => IntFilterSchema),z.number() ]).optional(),
  bug_image_url: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  bug_type: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  bug_size: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  equipment: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  price: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  note: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  created_at: z.union([ z.lazy(() => DateTimeNullableFilterSchema),z.coerce.date() ]).optional().nullable(),
  status: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  title: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
}).strict();

export const MatchUpsertWithWhereUniqueWithoutHunterInputSchema: z.ZodType<Prisma.MatchUpsertWithWhereUniqueWithoutHunterInput> = z.object({
  where: z.lazy(() => MatchWhereUniqueInputSchema),
  update: z.union([ z.lazy(() => MatchUpdateWithoutHunterInputSchema),z.lazy(() => MatchUncheckedUpdateWithoutHunterInputSchema) ]),
  create: z.union([ z.lazy(() => MatchCreateWithoutHunterInputSchema),z.lazy(() => MatchUncheckedCreateWithoutHunterInputSchema) ]),
}).strict();

export const MatchUpdateWithWhereUniqueWithoutHunterInputSchema: z.ZodType<Prisma.MatchUpdateWithWhereUniqueWithoutHunterInput> = z.object({
  where: z.lazy(() => MatchWhereUniqueInputSchema),
  data: z.union([ z.lazy(() => MatchUpdateWithoutHunterInputSchema),z.lazy(() => MatchUncheckedUpdateWithoutHunterInputSchema) ]),
}).strict();

export const MatchUpdateManyWithWhereWithoutHunterInputSchema: z.ZodType<Prisma.MatchUpdateManyWithWhereWithoutHunterInput> = z.object({
  where: z.lazy(() => MatchScalarWhereInputSchema),
  data: z.union([ z.lazy(() => MatchUpdateManyMutationInputSchema),z.lazy(() => MatchUncheckedUpdateManyWithoutHunterInputSchema) ]),
}).strict();

export const MatchUpsertWithWhereUniqueWithoutHelperInputSchema: z.ZodType<Prisma.MatchUpsertWithWhereUniqueWithoutHelperInput> = z.object({
  where: z.lazy(() => MatchWhereUniqueInputSchema),
  update: z.union([ z.lazy(() => MatchUpdateWithoutHelperInputSchema),z.lazy(() => MatchUncheckedUpdateWithoutHelperInputSchema) ]),
  create: z.union([ z.lazy(() => MatchCreateWithoutHelperInputSchema),z.lazy(() => MatchUncheckedCreateWithoutHelperInputSchema) ]),
}).strict();

export const MatchUpdateWithWhereUniqueWithoutHelperInputSchema: z.ZodType<Prisma.MatchUpdateWithWhereUniqueWithoutHelperInput> = z.object({
  where: z.lazy(() => MatchWhereUniqueInputSchema),
  data: z.union([ z.lazy(() => MatchUpdateWithoutHelperInputSchema),z.lazy(() => MatchUncheckedUpdateWithoutHelperInputSchema) ]),
}).strict();

export const MatchUpdateManyWithWhereWithoutHelperInputSchema: z.ZodType<Prisma.MatchUpdateManyWithWhereWithoutHelperInput> = z.object({
  where: z.lazy(() => MatchScalarWhereInputSchema),
  data: z.union([ z.lazy(() => MatchUpdateManyMutationInputSchema),z.lazy(() => MatchUncheckedUpdateManyWithoutHelperInputSchema) ]),
}).strict();

export const UserReviewUpsertWithWhereUniqueWithoutUserInputSchema: z.ZodType<Prisma.UserReviewUpsertWithWhereUniqueWithoutUserInput> = z.object({
  where: z.lazy(() => UserReviewWhereUniqueInputSchema),
  update: z.union([ z.lazy(() => UserReviewUpdateWithoutUserInputSchema),z.lazy(() => UserReviewUncheckedUpdateWithoutUserInputSchema) ]),
  create: z.union([ z.lazy(() => UserReviewCreateWithoutUserInputSchema),z.lazy(() => UserReviewUncheckedCreateWithoutUserInputSchema) ]),
}).strict();

export const UserReviewUpdateWithWhereUniqueWithoutUserInputSchema: z.ZodType<Prisma.UserReviewUpdateWithWhereUniqueWithoutUserInput> = z.object({
  where: z.lazy(() => UserReviewWhereUniqueInputSchema),
  data: z.union([ z.lazy(() => UserReviewUpdateWithoutUserInputSchema),z.lazy(() => UserReviewUncheckedUpdateWithoutUserInputSchema) ]),
}).strict();

export const UserReviewUpdateManyWithWhereWithoutUserInputSchema: z.ZodType<Prisma.UserReviewUpdateManyWithWhereWithoutUserInput> = z.object({
  where: z.lazy(() => UserReviewScalarWhereInputSchema),
  data: z.union([ z.lazy(() => UserReviewUpdateManyMutationInputSchema),z.lazy(() => UserReviewUncheckedUpdateManyWithoutUserInputSchema) ]),
}).strict();

export const UserReviewScalarWhereInputSchema: z.ZodType<Prisma.UserReviewScalarWhereInput> = z.object({
  AND: z.union([ z.lazy(() => UserReviewScalarWhereInputSchema),z.lazy(() => UserReviewScalarWhereInputSchema).array() ]).optional(),
  OR: z.lazy(() => UserReviewScalarWhereInputSchema).array().optional(),
  NOT: z.union([ z.lazy(() => UserReviewScalarWhereInputSchema),z.lazy(() => UserReviewScalarWhereInputSchema).array() ]).optional(),
  id: z.union([ z.lazy(() => IntFilterSchema),z.number() ]).optional(),
  user_id: z.union([ z.lazy(() => IntFilterSchema),z.number() ]).optional(),
  role: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  score: z.union([ z.lazy(() => IntNullableFilterSchema),z.number() ]).optional().nullable(),
  time_taken: z.union([ z.lazy(() => IntNullableFilterSchema),z.number() ]).optional().nullable(),
  price: z.union([ z.lazy(() => IntNullableFilterSchema),z.number() ]).optional().nullable(),
  review_note: z.union([ z.lazy(() => StringNullableFilterSchema),z.string() ]).optional().nullable(),
  created_at: z.union([ z.lazy(() => DateTimeNullableFilterSchema),z.coerce.date() ]).optional().nullable(),
}).strict();

export const MatchCreateManyBug_reportInputSchema: z.ZodType<Prisma.MatchCreateManyBug_reportInput> = z.object({
  id: z.number().int().optional(),
  helper_id: z.number().int(),
  hunter_id: z.number().int(),
  status: z.string().optional().nullable(),
  created_at: z.coerce.date().optional().nullable(),
  accepted_at: z.coerce.date().optional().nullable(),
  rejected_at: z.coerce.date().optional().nullable()
}).strict();

export const MatchUpdateWithoutBug_reportInputSchema: z.ZodType<Prisma.MatchUpdateWithoutBug_reportInput> = z.object({
  status: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  created_at: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  accepted_at: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  rejected_at: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  chats: z.lazy(() => ChatUpdateManyWithoutMatchNestedInputSchema).optional(),
  hunter: z.lazy(() => UserUpdateOneRequiredWithoutHunter_matchesNestedInputSchema).optional(),
  helper: z.lazy(() => UserUpdateOneRequiredWithoutHelper_matchesNestedInputSchema).optional()
}).strict();

export const MatchUncheckedUpdateWithoutBug_reportInputSchema: z.ZodType<Prisma.MatchUncheckedUpdateWithoutBug_reportInput> = z.object({
  id: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  helper_id: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  hunter_id: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  status: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  created_at: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  accepted_at: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  rejected_at: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  chats: z.lazy(() => ChatUncheckedUpdateManyWithoutMatchNestedInputSchema).optional()
}).strict();

export const MatchUncheckedUpdateManyWithoutBug_reportInputSchema: z.ZodType<Prisma.MatchUncheckedUpdateManyWithoutBug_reportInput> = z.object({
  id: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  helper_id: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  hunter_id: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  status: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  created_at: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  accepted_at: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  rejected_at: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
}).strict();

export const ChatCreateManyMatchInputSchema: z.ZodType<Prisma.ChatCreateManyMatchInput> = z.object({
  id: z.number().int().optional(),
  status: z.string().optional().nullable(),
  created_at: z.coerce.date().optional().nullable(),
  blocked_at: z.coerce.date().optional().nullable()
}).strict();

export const ChatUpdateWithoutMatchInputSchema: z.ZodType<Prisma.ChatUpdateWithoutMatchInput> = z.object({
  status: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  created_at: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  blocked_at: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
}).strict();

export const ChatUncheckedUpdateWithoutMatchInputSchema: z.ZodType<Prisma.ChatUncheckedUpdateWithoutMatchInput> = z.object({
  id: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  status: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  created_at: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  blocked_at: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
}).strict();

export const ChatUncheckedUpdateManyWithoutMatchInputSchema: z.ZodType<Prisma.ChatUncheckedUpdateManyWithoutMatchInput> = z.object({
  id: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  status: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  created_at: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  blocked_at: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
}).strict();

export const BugReportCreateManyUserInputSchema: z.ZodType<Prisma.BugReportCreateManyUserInput> = z.object({
  id: z.number().int().optional(),
  latitude: z.number(),
  longitude: z.number(),
  bug_image_url: z.string().optional().nullable(),
  bug_type: z.string().optional().nullable(),
  bug_size: z.string().optional().nullable(),
  equipment: z.string().optional().nullable(),
  price: z.string().optional().nullable(),
  note: z.string().optional().nullable(),
  created_at: z.coerce.date().optional().nullable(),
  status: z.string().optional().nullable(),
  title: z.string().optional().nullable()
}).strict();

export const MatchCreateManyHunterInputSchema: z.ZodType<Prisma.MatchCreateManyHunterInput> = z.object({
  id: z.number().int().optional(),
  bug_report_id: z.number().int().optional().nullable(),
  helper_id: z.number().int(),
  status: z.string().optional().nullable(),
  created_at: z.coerce.date().optional().nullable(),
  accepted_at: z.coerce.date().optional().nullable(),
  rejected_at: z.coerce.date().optional().nullable()
}).strict();

export const MatchCreateManyHelperInputSchema: z.ZodType<Prisma.MatchCreateManyHelperInput> = z.object({
  id: z.number().int().optional(),
  bug_report_id: z.number().int().optional().nullable(),
  hunter_id: z.number().int(),
  status: z.string().optional().nullable(),
  created_at: z.coerce.date().optional().nullable(),
  accepted_at: z.coerce.date().optional().nullable(),
  rejected_at: z.coerce.date().optional().nullable()
}).strict();

export const UserReviewCreateManyUserInputSchema: z.ZodType<Prisma.UserReviewCreateManyUserInput> = z.object({
  id: z.number().int().optional(),
  role: z.string().optional().nullable(),
  score: z.number().int().optional().nullable(),
  time_taken: z.number().int().optional().nullable(),
  price: z.number().int().optional().nullable(),
  review_note: z.string().optional().nullable(),
  created_at: z.coerce.date().optional().nullable()
}).strict();

export const BugReportUpdateWithoutUserInputSchema: z.ZodType<Prisma.BugReportUpdateWithoutUserInput> = z.object({
  latitude: z.union([ z.number(),z.lazy(() => FloatFieldUpdateOperationsInputSchema) ]).optional(),
  longitude: z.union([ z.number(),z.lazy(() => FloatFieldUpdateOperationsInputSchema) ]).optional(),
  bug_image_url: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  bug_type: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  bug_size: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  equipment: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  price: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  note: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  created_at: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  status: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  title: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  matches: z.lazy(() => MatchUpdateManyWithoutBug_reportNestedInputSchema).optional()
}).strict();

export const BugReportUncheckedUpdateWithoutUserInputSchema: z.ZodType<Prisma.BugReportUncheckedUpdateWithoutUserInput> = z.object({
  id: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  latitude: z.union([ z.number(),z.lazy(() => FloatFieldUpdateOperationsInputSchema) ]).optional(),
  longitude: z.union([ z.number(),z.lazy(() => FloatFieldUpdateOperationsInputSchema) ]).optional(),
  bug_image_url: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  bug_type: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  bug_size: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  equipment: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  price: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  note: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  created_at: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  status: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  title: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  matches: z.lazy(() => MatchUncheckedUpdateManyWithoutBug_reportNestedInputSchema).optional()
}).strict();

export const BugReportUncheckedUpdateManyWithoutUserInputSchema: z.ZodType<Prisma.BugReportUncheckedUpdateManyWithoutUserInput> = z.object({
  id: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  latitude: z.union([ z.number(),z.lazy(() => FloatFieldUpdateOperationsInputSchema) ]).optional(),
  longitude: z.union([ z.number(),z.lazy(() => FloatFieldUpdateOperationsInputSchema) ]).optional(),
  bug_image_url: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  bug_type: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  bug_size: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  equipment: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  price: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  note: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  created_at: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  status: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  title: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
}).strict();

export const MatchUpdateWithoutHunterInputSchema: z.ZodType<Prisma.MatchUpdateWithoutHunterInput> = z.object({
  status: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  created_at: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  accepted_at: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  rejected_at: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  chats: z.lazy(() => ChatUpdateManyWithoutMatchNestedInputSchema).optional(),
  bug_report: z.lazy(() => BugReportUpdateOneWithoutMatchesNestedInputSchema).optional(),
  helper: z.lazy(() => UserUpdateOneRequiredWithoutHelper_matchesNestedInputSchema).optional()
}).strict();

export const MatchUncheckedUpdateWithoutHunterInputSchema: z.ZodType<Prisma.MatchUncheckedUpdateWithoutHunterInput> = z.object({
  id: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  bug_report_id: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  helper_id: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  status: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  created_at: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  accepted_at: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  rejected_at: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  chats: z.lazy(() => ChatUncheckedUpdateManyWithoutMatchNestedInputSchema).optional()
}).strict();

export const MatchUncheckedUpdateManyWithoutHunterInputSchema: z.ZodType<Prisma.MatchUncheckedUpdateManyWithoutHunterInput> = z.object({
  id: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  bug_report_id: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  helper_id: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  status: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  created_at: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  accepted_at: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  rejected_at: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
}).strict();

export const MatchUpdateWithoutHelperInputSchema: z.ZodType<Prisma.MatchUpdateWithoutHelperInput> = z.object({
  status: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  created_at: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  accepted_at: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  rejected_at: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  chats: z.lazy(() => ChatUpdateManyWithoutMatchNestedInputSchema).optional(),
  bug_report: z.lazy(() => BugReportUpdateOneWithoutMatchesNestedInputSchema).optional(),
  hunter: z.lazy(() => UserUpdateOneRequiredWithoutHunter_matchesNestedInputSchema).optional()
}).strict();

export const MatchUncheckedUpdateWithoutHelperInputSchema: z.ZodType<Prisma.MatchUncheckedUpdateWithoutHelperInput> = z.object({
  id: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  bug_report_id: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  hunter_id: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  status: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  created_at: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  accepted_at: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  rejected_at: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  chats: z.lazy(() => ChatUncheckedUpdateManyWithoutMatchNestedInputSchema).optional()
}).strict();

export const MatchUncheckedUpdateManyWithoutHelperInputSchema: z.ZodType<Prisma.MatchUncheckedUpdateManyWithoutHelperInput> = z.object({
  id: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  bug_report_id: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  hunter_id: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  status: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  created_at: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  accepted_at: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  rejected_at: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
}).strict();

export const UserReviewUpdateWithoutUserInputSchema: z.ZodType<Prisma.UserReviewUpdateWithoutUserInput> = z.object({
  role: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  score: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  time_taken: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  price: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  review_note: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  created_at: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
}).strict();

export const UserReviewUncheckedUpdateWithoutUserInputSchema: z.ZodType<Prisma.UserReviewUncheckedUpdateWithoutUserInput> = z.object({
  id: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  role: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  score: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  time_taken: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  price: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  review_note: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  created_at: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
}).strict();

export const UserReviewUncheckedUpdateManyWithoutUserInputSchema: z.ZodType<Prisma.UserReviewUncheckedUpdateManyWithoutUserInput> = z.object({
  id: z.union([ z.number().int(),z.lazy(() => IntFieldUpdateOperationsInputSchema) ]).optional(),
  role: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  score: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  time_taken: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  price: z.union([ z.number().int(),z.lazy(() => NullableIntFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  review_note: z.union([ z.string(),z.lazy(() => NullableStringFieldUpdateOperationsInputSchema) ]).optional().nullable(),
  created_at: z.union([ z.coerce.date(),z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema) ]).optional().nullable(),
}).strict();

/////////////////////////////////////////
// ARGS
/////////////////////////////////////////

export const BugReportFindFirstArgsSchema: z.ZodType<Prisma.BugReportFindFirstArgs> = z.object({
  select: BugReportSelectSchema.optional(),
  include: BugReportIncludeSchema.optional(),
  where: BugReportWhereInputSchema.optional(),
  orderBy: z.union([ BugReportOrderByWithRelationInputSchema.array(),BugReportOrderByWithRelationInputSchema ]).optional(),
  cursor: BugReportWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ BugReportScalarFieldEnumSchema,BugReportScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const BugReportFindFirstOrThrowArgsSchema: z.ZodType<Prisma.BugReportFindFirstOrThrowArgs> = z.object({
  select: BugReportSelectSchema.optional(),
  include: BugReportIncludeSchema.optional(),
  where: BugReportWhereInputSchema.optional(),
  orderBy: z.union([ BugReportOrderByWithRelationInputSchema.array(),BugReportOrderByWithRelationInputSchema ]).optional(),
  cursor: BugReportWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ BugReportScalarFieldEnumSchema,BugReportScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const BugReportFindManyArgsSchema: z.ZodType<Prisma.BugReportFindManyArgs> = z.object({
  select: BugReportSelectSchema.optional(),
  include: BugReportIncludeSchema.optional(),
  where: BugReportWhereInputSchema.optional(),
  orderBy: z.union([ BugReportOrderByWithRelationInputSchema.array(),BugReportOrderByWithRelationInputSchema ]).optional(),
  cursor: BugReportWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ BugReportScalarFieldEnumSchema,BugReportScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const BugReportAggregateArgsSchema: z.ZodType<Prisma.BugReportAggregateArgs> = z.object({
  where: BugReportWhereInputSchema.optional(),
  orderBy: z.union([ BugReportOrderByWithRelationInputSchema.array(),BugReportOrderByWithRelationInputSchema ]).optional(),
  cursor: BugReportWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export const BugReportGroupByArgsSchema: z.ZodType<Prisma.BugReportGroupByArgs> = z.object({
  where: BugReportWhereInputSchema.optional(),
  orderBy: z.union([ BugReportOrderByWithAggregationInputSchema.array(),BugReportOrderByWithAggregationInputSchema ]).optional(),
  by: BugReportScalarFieldEnumSchema.array(),
  having: BugReportScalarWhereWithAggregatesInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export const BugReportFindUniqueArgsSchema: z.ZodType<Prisma.BugReportFindUniqueArgs> = z.object({
  select: BugReportSelectSchema.optional(),
  include: BugReportIncludeSchema.optional(),
  where: BugReportWhereUniqueInputSchema,
}).strict() ;

export const BugReportFindUniqueOrThrowArgsSchema: z.ZodType<Prisma.BugReportFindUniqueOrThrowArgs> = z.object({
  select: BugReportSelectSchema.optional(),
  include: BugReportIncludeSchema.optional(),
  where: BugReportWhereUniqueInputSchema,
}).strict() ;

export const ChatFindFirstArgsSchema: z.ZodType<Prisma.ChatFindFirstArgs> = z.object({
  select: ChatSelectSchema.optional(),
  include: ChatIncludeSchema.optional(),
  where: ChatWhereInputSchema.optional(),
  orderBy: z.union([ ChatOrderByWithRelationInputSchema.array(),ChatOrderByWithRelationInputSchema ]).optional(),
  cursor: ChatWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ ChatScalarFieldEnumSchema,ChatScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const ChatFindFirstOrThrowArgsSchema: z.ZodType<Prisma.ChatFindFirstOrThrowArgs> = z.object({
  select: ChatSelectSchema.optional(),
  include: ChatIncludeSchema.optional(),
  where: ChatWhereInputSchema.optional(),
  orderBy: z.union([ ChatOrderByWithRelationInputSchema.array(),ChatOrderByWithRelationInputSchema ]).optional(),
  cursor: ChatWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ ChatScalarFieldEnumSchema,ChatScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const ChatFindManyArgsSchema: z.ZodType<Prisma.ChatFindManyArgs> = z.object({
  select: ChatSelectSchema.optional(),
  include: ChatIncludeSchema.optional(),
  where: ChatWhereInputSchema.optional(),
  orderBy: z.union([ ChatOrderByWithRelationInputSchema.array(),ChatOrderByWithRelationInputSchema ]).optional(),
  cursor: ChatWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ ChatScalarFieldEnumSchema,ChatScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const ChatAggregateArgsSchema: z.ZodType<Prisma.ChatAggregateArgs> = z.object({
  where: ChatWhereInputSchema.optional(),
  orderBy: z.union([ ChatOrderByWithRelationInputSchema.array(),ChatOrderByWithRelationInputSchema ]).optional(),
  cursor: ChatWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export const ChatGroupByArgsSchema: z.ZodType<Prisma.ChatGroupByArgs> = z.object({
  where: ChatWhereInputSchema.optional(),
  orderBy: z.union([ ChatOrderByWithAggregationInputSchema.array(),ChatOrderByWithAggregationInputSchema ]).optional(),
  by: ChatScalarFieldEnumSchema.array(),
  having: ChatScalarWhereWithAggregatesInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export const ChatFindUniqueArgsSchema: z.ZodType<Prisma.ChatFindUniqueArgs> = z.object({
  select: ChatSelectSchema.optional(),
  include: ChatIncludeSchema.optional(),
  where: ChatWhereUniqueInputSchema,
}).strict() ;

export const ChatFindUniqueOrThrowArgsSchema: z.ZodType<Prisma.ChatFindUniqueOrThrowArgs> = z.object({
  select: ChatSelectSchema.optional(),
  include: ChatIncludeSchema.optional(),
  where: ChatWhereUniqueInputSchema,
}).strict() ;

export const MatchFindFirstArgsSchema: z.ZodType<Prisma.MatchFindFirstArgs> = z.object({
  select: MatchSelectSchema.optional(),
  include: MatchIncludeSchema.optional(),
  where: MatchWhereInputSchema.optional(),
  orderBy: z.union([ MatchOrderByWithRelationInputSchema.array(),MatchOrderByWithRelationInputSchema ]).optional(),
  cursor: MatchWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ MatchScalarFieldEnumSchema,MatchScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const MatchFindFirstOrThrowArgsSchema: z.ZodType<Prisma.MatchFindFirstOrThrowArgs> = z.object({
  select: MatchSelectSchema.optional(),
  include: MatchIncludeSchema.optional(),
  where: MatchWhereInputSchema.optional(),
  orderBy: z.union([ MatchOrderByWithRelationInputSchema.array(),MatchOrderByWithRelationInputSchema ]).optional(),
  cursor: MatchWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ MatchScalarFieldEnumSchema,MatchScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const MatchFindManyArgsSchema: z.ZodType<Prisma.MatchFindManyArgs> = z.object({
  select: MatchSelectSchema.optional(),
  include: MatchIncludeSchema.optional(),
  where: MatchWhereInputSchema.optional(),
  orderBy: z.union([ MatchOrderByWithRelationInputSchema.array(),MatchOrderByWithRelationInputSchema ]).optional(),
  cursor: MatchWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ MatchScalarFieldEnumSchema,MatchScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const MatchAggregateArgsSchema: z.ZodType<Prisma.MatchAggregateArgs> = z.object({
  where: MatchWhereInputSchema.optional(),
  orderBy: z.union([ MatchOrderByWithRelationInputSchema.array(),MatchOrderByWithRelationInputSchema ]).optional(),
  cursor: MatchWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export const MatchGroupByArgsSchema: z.ZodType<Prisma.MatchGroupByArgs> = z.object({
  where: MatchWhereInputSchema.optional(),
  orderBy: z.union([ MatchOrderByWithAggregationInputSchema.array(),MatchOrderByWithAggregationInputSchema ]).optional(),
  by: MatchScalarFieldEnumSchema.array(),
  having: MatchScalarWhereWithAggregatesInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export const MatchFindUniqueArgsSchema: z.ZodType<Prisma.MatchFindUniqueArgs> = z.object({
  select: MatchSelectSchema.optional(),
  include: MatchIncludeSchema.optional(),
  where: MatchWhereUniqueInputSchema,
}).strict() ;

export const MatchFindUniqueOrThrowArgsSchema: z.ZodType<Prisma.MatchFindUniqueOrThrowArgs> = z.object({
  select: MatchSelectSchema.optional(),
  include: MatchIncludeSchema.optional(),
  where: MatchWhereUniqueInputSchema,
}).strict() ;

export const UserReviewFindFirstArgsSchema: z.ZodType<Prisma.UserReviewFindFirstArgs> = z.object({
  select: UserReviewSelectSchema.optional(),
  include: UserReviewIncludeSchema.optional(),
  where: UserReviewWhereInputSchema.optional(),
  orderBy: z.union([ UserReviewOrderByWithRelationInputSchema.array(),UserReviewOrderByWithRelationInputSchema ]).optional(),
  cursor: UserReviewWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ UserReviewScalarFieldEnumSchema,UserReviewScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const UserReviewFindFirstOrThrowArgsSchema: z.ZodType<Prisma.UserReviewFindFirstOrThrowArgs> = z.object({
  select: UserReviewSelectSchema.optional(),
  include: UserReviewIncludeSchema.optional(),
  where: UserReviewWhereInputSchema.optional(),
  orderBy: z.union([ UserReviewOrderByWithRelationInputSchema.array(),UserReviewOrderByWithRelationInputSchema ]).optional(),
  cursor: UserReviewWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ UserReviewScalarFieldEnumSchema,UserReviewScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const UserReviewFindManyArgsSchema: z.ZodType<Prisma.UserReviewFindManyArgs> = z.object({
  select: UserReviewSelectSchema.optional(),
  include: UserReviewIncludeSchema.optional(),
  where: UserReviewWhereInputSchema.optional(),
  orderBy: z.union([ UserReviewOrderByWithRelationInputSchema.array(),UserReviewOrderByWithRelationInputSchema ]).optional(),
  cursor: UserReviewWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ UserReviewScalarFieldEnumSchema,UserReviewScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const UserReviewAggregateArgsSchema: z.ZodType<Prisma.UserReviewAggregateArgs> = z.object({
  where: UserReviewWhereInputSchema.optional(),
  orderBy: z.union([ UserReviewOrderByWithRelationInputSchema.array(),UserReviewOrderByWithRelationInputSchema ]).optional(),
  cursor: UserReviewWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export const UserReviewGroupByArgsSchema: z.ZodType<Prisma.UserReviewGroupByArgs> = z.object({
  where: UserReviewWhereInputSchema.optional(),
  orderBy: z.union([ UserReviewOrderByWithAggregationInputSchema.array(),UserReviewOrderByWithAggregationInputSchema ]).optional(),
  by: UserReviewScalarFieldEnumSchema.array(),
  having: UserReviewScalarWhereWithAggregatesInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export const UserReviewFindUniqueArgsSchema: z.ZodType<Prisma.UserReviewFindUniqueArgs> = z.object({
  select: UserReviewSelectSchema.optional(),
  include: UserReviewIncludeSchema.optional(),
  where: UserReviewWhereUniqueInputSchema,
}).strict() ;

export const UserReviewFindUniqueOrThrowArgsSchema: z.ZodType<Prisma.UserReviewFindUniqueOrThrowArgs> = z.object({
  select: UserReviewSelectSchema.optional(),
  include: UserReviewIncludeSchema.optional(),
  where: UserReviewWhereUniqueInputSchema,
}).strict() ;

export const UserFindFirstArgsSchema: z.ZodType<Prisma.UserFindFirstArgs> = z.object({
  select: UserSelectSchema.optional(),
  include: UserIncludeSchema.optional(),
  where: UserWhereInputSchema.optional(),
  orderBy: z.union([ UserOrderByWithRelationInputSchema.array(),UserOrderByWithRelationInputSchema ]).optional(),
  cursor: UserWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ UserScalarFieldEnumSchema,UserScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const UserFindFirstOrThrowArgsSchema: z.ZodType<Prisma.UserFindFirstOrThrowArgs> = z.object({
  select: UserSelectSchema.optional(),
  include: UserIncludeSchema.optional(),
  where: UserWhereInputSchema.optional(),
  orderBy: z.union([ UserOrderByWithRelationInputSchema.array(),UserOrderByWithRelationInputSchema ]).optional(),
  cursor: UserWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ UserScalarFieldEnumSchema,UserScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const UserFindManyArgsSchema: z.ZodType<Prisma.UserFindManyArgs> = z.object({
  select: UserSelectSchema.optional(),
  include: UserIncludeSchema.optional(),
  where: UserWhereInputSchema.optional(),
  orderBy: z.union([ UserOrderByWithRelationInputSchema.array(),UserOrderByWithRelationInputSchema ]).optional(),
  cursor: UserWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
  distinct: z.union([ UserScalarFieldEnumSchema,UserScalarFieldEnumSchema.array() ]).optional(),
}).strict() ;

export const UserAggregateArgsSchema: z.ZodType<Prisma.UserAggregateArgs> = z.object({
  where: UserWhereInputSchema.optional(),
  orderBy: z.union([ UserOrderByWithRelationInputSchema.array(),UserOrderByWithRelationInputSchema ]).optional(),
  cursor: UserWhereUniqueInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export const UserGroupByArgsSchema: z.ZodType<Prisma.UserGroupByArgs> = z.object({
  where: UserWhereInputSchema.optional(),
  orderBy: z.union([ UserOrderByWithAggregationInputSchema.array(),UserOrderByWithAggregationInputSchema ]).optional(),
  by: UserScalarFieldEnumSchema.array(),
  having: UserScalarWhereWithAggregatesInputSchema.optional(),
  take: z.number().optional(),
  skip: z.number().optional(),
}).strict() ;

export const UserFindUniqueArgsSchema: z.ZodType<Prisma.UserFindUniqueArgs> = z.object({
  select: UserSelectSchema.optional(),
  include: UserIncludeSchema.optional(),
  where: UserWhereUniqueInputSchema,
}).strict() ;

export const UserFindUniqueOrThrowArgsSchema: z.ZodType<Prisma.UserFindUniqueOrThrowArgs> = z.object({
  select: UserSelectSchema.optional(),
  include: UserIncludeSchema.optional(),
  where: UserWhereUniqueInputSchema,
}).strict() ;

export const BugReportCreateArgsSchema: z.ZodType<Prisma.BugReportCreateArgs> = z.object({
  select: BugReportSelectSchema.optional(),
  include: BugReportIncludeSchema.optional(),
  data: z.union([ BugReportCreateInputSchema,BugReportUncheckedCreateInputSchema ]),
}).strict() ;

export const BugReportUpsertArgsSchema: z.ZodType<Prisma.BugReportUpsertArgs> = z.object({
  select: BugReportSelectSchema.optional(),
  include: BugReportIncludeSchema.optional(),
  where: BugReportWhereUniqueInputSchema,
  create: z.union([ BugReportCreateInputSchema,BugReportUncheckedCreateInputSchema ]),
  update: z.union([ BugReportUpdateInputSchema,BugReportUncheckedUpdateInputSchema ]),
}).strict() ;

export const BugReportCreateManyArgsSchema: z.ZodType<Prisma.BugReportCreateManyArgs> = z.object({
  data: z.union([ BugReportCreateManyInputSchema,BugReportCreateManyInputSchema.array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict() ;

export const BugReportDeleteArgsSchema: z.ZodType<Prisma.BugReportDeleteArgs> = z.object({
  select: BugReportSelectSchema.optional(),
  include: BugReportIncludeSchema.optional(),
  where: BugReportWhereUniqueInputSchema,
}).strict() ;

export const BugReportUpdateArgsSchema: z.ZodType<Prisma.BugReportUpdateArgs> = z.object({
  select: BugReportSelectSchema.optional(),
  include: BugReportIncludeSchema.optional(),
  data: z.union([ BugReportUpdateInputSchema,BugReportUncheckedUpdateInputSchema ]),
  where: BugReportWhereUniqueInputSchema,
}).strict() ;

export const BugReportUpdateManyArgsSchema: z.ZodType<Prisma.BugReportUpdateManyArgs> = z.object({
  data: z.union([ BugReportUpdateManyMutationInputSchema,BugReportUncheckedUpdateManyInputSchema ]),
  where: BugReportWhereInputSchema.optional(),
}).strict() ;

export const BugReportDeleteManyArgsSchema: z.ZodType<Prisma.BugReportDeleteManyArgs> = z.object({
  where: BugReportWhereInputSchema.optional(),
}).strict() ;

export const ChatCreateArgsSchema: z.ZodType<Prisma.ChatCreateArgs> = z.object({
  select: ChatSelectSchema.optional(),
  include: ChatIncludeSchema.optional(),
  data: z.union([ ChatCreateInputSchema,ChatUncheckedCreateInputSchema ]).optional(),
}).strict() ;

export const ChatUpsertArgsSchema: z.ZodType<Prisma.ChatUpsertArgs> = z.object({
  select: ChatSelectSchema.optional(),
  include: ChatIncludeSchema.optional(),
  where: ChatWhereUniqueInputSchema,
  create: z.union([ ChatCreateInputSchema,ChatUncheckedCreateInputSchema ]),
  update: z.union([ ChatUpdateInputSchema,ChatUncheckedUpdateInputSchema ]),
}).strict() ;

export const ChatCreateManyArgsSchema: z.ZodType<Prisma.ChatCreateManyArgs> = z.object({
  data: z.union([ ChatCreateManyInputSchema,ChatCreateManyInputSchema.array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict() ;

export const ChatDeleteArgsSchema: z.ZodType<Prisma.ChatDeleteArgs> = z.object({
  select: ChatSelectSchema.optional(),
  include: ChatIncludeSchema.optional(),
  where: ChatWhereUniqueInputSchema,
}).strict() ;

export const ChatUpdateArgsSchema: z.ZodType<Prisma.ChatUpdateArgs> = z.object({
  select: ChatSelectSchema.optional(),
  include: ChatIncludeSchema.optional(),
  data: z.union([ ChatUpdateInputSchema,ChatUncheckedUpdateInputSchema ]),
  where: ChatWhereUniqueInputSchema,
}).strict() ;

export const ChatUpdateManyArgsSchema: z.ZodType<Prisma.ChatUpdateManyArgs> = z.object({
  data: z.union([ ChatUpdateManyMutationInputSchema,ChatUncheckedUpdateManyInputSchema ]),
  where: ChatWhereInputSchema.optional(),
}).strict() ;

export const ChatDeleteManyArgsSchema: z.ZodType<Prisma.ChatDeleteManyArgs> = z.object({
  where: ChatWhereInputSchema.optional(),
}).strict() ;

export const MatchCreateArgsSchema: z.ZodType<Prisma.MatchCreateArgs> = z.object({
  select: MatchSelectSchema.optional(),
  include: MatchIncludeSchema.optional(),
  data: z.union([ MatchCreateInputSchema,MatchUncheckedCreateInputSchema ]),
}).strict() ;

export const MatchUpsertArgsSchema: z.ZodType<Prisma.MatchUpsertArgs> = z.object({
  select: MatchSelectSchema.optional(),
  include: MatchIncludeSchema.optional(),
  where: MatchWhereUniqueInputSchema,
  create: z.union([ MatchCreateInputSchema,MatchUncheckedCreateInputSchema ]),
  update: z.union([ MatchUpdateInputSchema,MatchUncheckedUpdateInputSchema ]),
}).strict() ;

export const MatchCreateManyArgsSchema: z.ZodType<Prisma.MatchCreateManyArgs> = z.object({
  data: z.union([ MatchCreateManyInputSchema,MatchCreateManyInputSchema.array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict() ;

export const MatchDeleteArgsSchema: z.ZodType<Prisma.MatchDeleteArgs> = z.object({
  select: MatchSelectSchema.optional(),
  include: MatchIncludeSchema.optional(),
  where: MatchWhereUniqueInputSchema,
}).strict() ;

export const MatchUpdateArgsSchema: z.ZodType<Prisma.MatchUpdateArgs> = z.object({
  select: MatchSelectSchema.optional(),
  include: MatchIncludeSchema.optional(),
  data: z.union([ MatchUpdateInputSchema,MatchUncheckedUpdateInputSchema ]),
  where: MatchWhereUniqueInputSchema,
}).strict() ;

export const MatchUpdateManyArgsSchema: z.ZodType<Prisma.MatchUpdateManyArgs> = z.object({
  data: z.union([ MatchUpdateManyMutationInputSchema,MatchUncheckedUpdateManyInputSchema ]),
  where: MatchWhereInputSchema.optional(),
}).strict() ;

export const MatchDeleteManyArgsSchema: z.ZodType<Prisma.MatchDeleteManyArgs> = z.object({
  where: MatchWhereInputSchema.optional(),
}).strict() ;

export const UserReviewCreateArgsSchema: z.ZodType<Prisma.UserReviewCreateArgs> = z.object({
  select: UserReviewSelectSchema.optional(),
  include: UserReviewIncludeSchema.optional(),
  data: z.union([ UserReviewCreateInputSchema,UserReviewUncheckedCreateInputSchema ]),
}).strict() ;

export const UserReviewUpsertArgsSchema: z.ZodType<Prisma.UserReviewUpsertArgs> = z.object({
  select: UserReviewSelectSchema.optional(),
  include: UserReviewIncludeSchema.optional(),
  where: UserReviewWhereUniqueInputSchema,
  create: z.union([ UserReviewCreateInputSchema,UserReviewUncheckedCreateInputSchema ]),
  update: z.union([ UserReviewUpdateInputSchema,UserReviewUncheckedUpdateInputSchema ]),
}).strict() ;

export const UserReviewCreateManyArgsSchema: z.ZodType<Prisma.UserReviewCreateManyArgs> = z.object({
  data: z.union([ UserReviewCreateManyInputSchema,UserReviewCreateManyInputSchema.array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict() ;

export const UserReviewDeleteArgsSchema: z.ZodType<Prisma.UserReviewDeleteArgs> = z.object({
  select: UserReviewSelectSchema.optional(),
  include: UserReviewIncludeSchema.optional(),
  where: UserReviewWhereUniqueInputSchema,
}).strict() ;

export const UserReviewUpdateArgsSchema: z.ZodType<Prisma.UserReviewUpdateArgs> = z.object({
  select: UserReviewSelectSchema.optional(),
  include: UserReviewIncludeSchema.optional(),
  data: z.union([ UserReviewUpdateInputSchema,UserReviewUncheckedUpdateInputSchema ]),
  where: UserReviewWhereUniqueInputSchema,
}).strict() ;

export const UserReviewUpdateManyArgsSchema: z.ZodType<Prisma.UserReviewUpdateManyArgs> = z.object({
  data: z.union([ UserReviewUpdateManyMutationInputSchema,UserReviewUncheckedUpdateManyInputSchema ]),
  where: UserReviewWhereInputSchema.optional(),
}).strict() ;

export const UserReviewDeleteManyArgsSchema: z.ZodType<Prisma.UserReviewDeleteManyArgs> = z.object({
  where: UserReviewWhereInputSchema.optional(),
}).strict() ;

export const UserCreateArgsSchema: z.ZodType<Prisma.UserCreateArgs> = z.object({
  select: UserSelectSchema.optional(),
  include: UserIncludeSchema.optional(),
  data: z.union([ UserCreateInputSchema,UserUncheckedCreateInputSchema ]),
}).strict() ;

export const UserUpsertArgsSchema: z.ZodType<Prisma.UserUpsertArgs> = z.object({
  select: UserSelectSchema.optional(),
  include: UserIncludeSchema.optional(),
  where: UserWhereUniqueInputSchema,
  create: z.union([ UserCreateInputSchema,UserUncheckedCreateInputSchema ]),
  update: z.union([ UserUpdateInputSchema,UserUncheckedUpdateInputSchema ]),
}).strict() ;

export const UserCreateManyArgsSchema: z.ZodType<Prisma.UserCreateManyArgs> = z.object({
  data: z.union([ UserCreateManyInputSchema,UserCreateManyInputSchema.array() ]),
  skipDuplicates: z.boolean().optional(),
}).strict() ;

export const UserDeleteArgsSchema: z.ZodType<Prisma.UserDeleteArgs> = z.object({
  select: UserSelectSchema.optional(),
  include: UserIncludeSchema.optional(),
  where: UserWhereUniqueInputSchema,
}).strict() ;

export const UserUpdateArgsSchema: z.ZodType<Prisma.UserUpdateArgs> = z.object({
  select: UserSelectSchema.optional(),
  include: UserIncludeSchema.optional(),
  data: z.union([ UserUpdateInputSchema,UserUncheckedUpdateInputSchema ]),
  where: UserWhereUniqueInputSchema,
}).strict() ;

export const UserUpdateManyArgsSchema: z.ZodType<Prisma.UserUpdateManyArgs> = z.object({
  data: z.union([ UserUpdateManyMutationInputSchema,UserUncheckedUpdateManyInputSchema ]),
  where: UserWhereInputSchema.optional(),
}).strict() ;

export const UserDeleteManyArgsSchema: z.ZodType<Prisma.UserDeleteManyArgs> = z.object({
  where: UserWhereInputSchema.optional(),
}).strict() ;