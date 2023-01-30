#include <node_api.h>

#define BBU_CALL(call, message)                                               \
  if ((call) != napi_ok)                                                      \
    {                                                                         \
      napi_throw_error (env, NULL, message);                                  \
      return NULL;                                                            \
    }

#define BBU_ARGS(count)                                                       \
  size_t argc = count;                                                        \
  napi_value argv[count];                                                     \
  BBU_CALL (napi_get_cb_info (env, info, &argc, argv, NULL, NULL),            \
            "failed to get arguments");

#define BBU_BUFFER_ARG(i)                                                     \
  size_t word_count;                                                          \
  uint64_t *words;                                                            \
  BBU_CALL (                                                                  \
      napi_get_buffer_info (env, argv[i], (void **)&words, &word_count),      \
      "failed to get buffer info");                                           \
  word_count /= sizeof (uint64_t);

#define BBU_METHOD(name, method)                                              \
  {                                                                           \
    name, NULL, method, NULL, NULL, NULL, napi_default, NULL                  \
  }

napi_value
sizeof_bigint_as_buffer (napi_env env, napi_callback_info info)
{
  BBU_ARGS (1);

  size_t sz;
  BBU_CALL (napi_get_value_bigint_words (env, argv[0], NULL, &sz, NULL),
            "failed to get bigint word count");
  sz *= sizeof (uint64_t);

  napi_value res;
  BBU_CALL (napi_create_int64 (env, sz, &res),
            "failed to create number from int64");

  return res;
}

napi_value
write_bigint_to_buffer (napi_env env, napi_callback_info info)
{
  BBU_ARGS (2);

  BBU_BUFFER_ARG (1);

  if (word_count)
    {
      size_t word_count_required = word_count;
      int sign;
      BBU_CALL (napi_get_value_bigint_words (env, argv[0], &sign,
                                             &word_count_required, words),
                "failed to get bigint words");

      word_count = word_count < word_count_required ? word_count
                                                    : word_count_required;
    }

  napi_value res;
  BBU_CALL (napi_create_int64 (env, word_count * sizeof (uint64_t), &res),
            "failed to create number from int64");

  return res;
}

napi_value
read_bigint_from_buffer (napi_env env, napi_callback_info info)
{
  BBU_ARGS (1);

  BBU_BUFFER_ARG (0);

  napi_value res;
  if (!word_count)
    {
      BBU_CALL (napi_create_bigint_uint64 (env, 0, &res),
                "failed to create bigint from uint64");
    }
  else
    {
      BBU_CALL (napi_create_bigint_words (env, 0, word_count, words, &res),
                "failed to create bigint from words");
    }

  return res;
}

NAPI_MODULE_INIT ()
{
  napi_property_descriptor props[]
      = { BBU_METHOD ("sizeOfBigIntAsBuffer", sizeof_bigint_as_buffer),
          BBU_METHOD ("writeBigIntToBuffer", write_bigint_to_buffer),
          BBU_METHOD ("readBigIntFromBuffer", read_bigint_from_buffer) };

  BBU_CALL (napi_define_properties (env, exports,
                                    sizeof (props) / sizeof (props[0]), props),
            "failed to define exports properties");

  return exports;
}