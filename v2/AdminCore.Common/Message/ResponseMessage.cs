using System.Collections.Generic;
using AdminCore.DAL.Models.Message.Elements;

namespace AdminCore.DAL.Models.Message
{
    public class ResponseMessage<T>
    {
        // private members
        private T _messageBody;

        // public constructors
        /// <summary>
        /// Create a new response payload with a message body domain object.
        /// </summary>
        /// <param name="messageBody"></param>
        public ResponseMessage(T messageBody)
        {
            _messageBody = messageBody;
        }

        /// <summary>
        /// Factory method to generate a ResponseMessage with an EmptyMessage payload.
        /// </summary>
        /// <returns></returns>
        public static ResponseMessage<EmptyMessage> CreateEmptyResponse()
        {
            return new ResponseMessage<EmptyMessage>(new EmptyMessage());

        }

        // public attributes
        /// <summary>
        /// Returns the status of the request represented by this message.  The value defaults to success.
        /// </summary>
        public string Status { get; set; } = MessageConstants.MsgStatusSuccess;

        /// <summary>
        /// Returns the domain object that represents the body of the response.
        /// </summary>
        public T Payload
        {
            get
            {
                return _messageBody;
            }
            set
            {
                _messageBody = value;

            }
        }

        /// <summary>
        /// Provides a list of AdditionalInfoItems to support messaging for errors.
        /// </summary>
        public List<AdditionalInfoItem> AdditionalInfo { get; } = new List<AdditionalInfoItem>();



    }
}